import { Request, Response } from "express";
import { Luminosidade } from "@prisma/client";
import * as PlantaRepository from "@repositories/PlantaRepository";

// O controller recebe a requisição, valida os dados, chama o repository
// e decide qual status HTTP e qual corpo devolver.

export const createPlanta = async (req: Request, res: Response) => {
  try {
    const { nome, especie, preco, estoque, luminosidade, petFriendly, regaACadaDias } = req.body ?? {};

    // 400 Bad Request: o cliente mandou dados incompletos
    if ([nome, especie, preco, estoque, luminosidade, petFriendly, regaACadaDias].some(x => x == null)) {
      return res.status(400).json({
        message: "Preencha todos os dados.",
      });
    }
    else {
      if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({
          message: "O nome deve ser uma string não vazia"
        });
      }
      if (typeof especie !== "string" || especie.trim() === "") {
        return res.status(400).json({
          message: "A especie deve ser uma string não vazia"
        });
      }
      if (!Number.isInteger(preco) || preco <= 0) {
        return res.status(400).json({
          message: "O preço deve ser um inteiro maior que zero"
        });
      }
      if (!Number.isInteger(estoque) || estoque < 0) {
        return res.status(400).json({
          message: "O estoque precisa ser um inteiro não negativo"
        });
      }
      if (!Object.values(Luminosidade).includes(luminosidade)) {
        return res.status(400).json({
          message: "Luminosidade deve ser SOMBRA, MEIA_SOMBRA ou SOL_PLENO"
        });
      }
      if (typeof petFriendly !== "boolean") {
        return res.status(400).json({
          message: "O valor deve ser verdadeiro ou falso"
        });
      }
      if (!Number.isInteger(regaACadaDias) || regaACadaDias < 1) {
        return res.status(400).json({
          message: "A quantidade de dias deve ser maior que 0"
        });
      }
    }

    const planta = await PlantaRepository.createPlanta({
      nome: nome,
      especie: especie,
      preco: preco,
      estoque: estoque,
      luminosidade: luminosidade,
      petFriendly: petFriendly,
      regaACadaDias: regaACadaDias
    });

    // 201 Created: algo novo foi criado
    return res.status(201).json(planta);
  } catch (error) {
    console.error(error);
    // 500 Internal Server Error: o problema foi nosso, não do cliente
    return res.status(500).json({ message: "Erro ao criar planta." });
  }
};

export const readAllPlantas = async (req: Request, res: Response) => {
  try {
    const { luminosidade, petFriendly } = req.query;
    if (luminosidade !== undefined && (!Object.values(Luminosidade).includes(luminosidade as Luminosidade))){
      return res.status(400).json({
        message: "Luminosidade deve ser SOMBRA, MEIA_SOMBRA ou SOL_PLENO"
      });
    }
    if (petFriendly !== undefined && petFriendly !== "true" && petFriendly !== "false"){
      return res.status(400).json({
        message: "petFriendly deve ser true ou false"
      });
    }

    let petFriendlyFiltro: boolean | undefined = undefined;
    if (petFriendly === "true") {
      petFriendlyFiltro = true;
    }
    if (petFriendly === "false"){
      petFriendlyFiltro = false;
    }

    const plantas = await PlantaRepository.findAllPlantas({
      luminosidade: luminosidade as Luminosidade | undefined,
      petFriendly: petFriendlyFiltro
    });

    return res.status(200).json(plantas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar plantas." });
  }
};

export const readPlantaById = async (req: Request, res: Response) => {
  try {
    // O id chega da URL como texto, então convertemos para número
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "id inválido"
      });
    }

    const planta = await PlantaRepository.findPlantaById(id);

    // 404 Not Found: o id não existe
    if (!planta) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    return res.status(200).json(planta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar planta." });
  }
};

export const updatePlanta = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "id inválido"
      });
    }

    const { nome, especie, preco, estoque, luminosidade, petFriendly, regaACadaDias } = req.body ?? {};

    if (nome !== undefined && (typeof nome !== "string" || nome.trim() === "")) {
      return res.status(400).json({
        message: "O nome deve ser uma string não vazia"
      });
    }
    if (especie !== undefined && (typeof especie !== "string" || especie.trim() === "")) {
      return res.status(400).json({
        message: "A especie deve ser uma string não vazia"
      });
    }
    if (preco !== undefined && (!Number.isInteger(preco) || preco <= 0)) {
      return res.status(400).json({
        message: "O preço deve ser um inteiro maior que zero"
      });
    }
    if (estoque !== undefined && (!Number.isInteger(estoque) || estoque < 0)) {
      return res.status(400).json({
        message: "O estoque precisa ser um inteiro não negativo"
      });
    }
    if (luminosidade !== undefined && (!Object.values(Luminosidade).includes(luminosidade))) {
      return res.status(400).json({
        message: "Luminosidade deve ser SOMBRA, MEIA_SOMBRA ou SOL_PLENO"
      });
    }
    if (petFriendly !== undefined && (typeof petFriendly !== "boolean")) {
      return res.status(400).json({
        message: "O valor deve ser verdadeiro ou falso"
      });
    }
    if (regaACadaDias !== undefined && (!Number.isInteger(regaACadaDias) || regaACadaDias < 1)) {
      return res.status(400).json({
        message: "A quantidade de dias deve ser maior que 0"
      });
    }

    // Antes de editar, garantimos que a planta existe
    const planta = await PlantaRepository.findPlantaById(id);

    if (!planta) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    // PATCH = atualização parcial: campos não enviados (undefined) não são alterados
    const updatedPlanta = await PlantaRepository.updatePlanta(id, {
      nome: nome,
      especie: especie,
      preco: preco,
      estoque: estoque,
      luminosidade: luminosidade,
      petFriendly: petFriendly,
      regaACadaDias: regaACadaDias
    });

    return res.status(200).json(updatedPlanta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar planta." });
  }
};

export const deletePlanta = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "id inválido"
      });
    }

    const planta = await PlantaRepository.findPlantaById(id);

    if (!planta) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    await PlantaRepository.deletePlanta(id);

    // 204 No Content: deu certo e não há nada para devolver
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar planta." });
  }
};