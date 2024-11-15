import type {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const getAllPrestadores = async (req: Request, res: Response) => {
  try {
    const prestadores = await prisma.prestador.findMany();
    res.json(prestadores);
  } catch (error) {
    res.status(400).json({error: "Erro ao listar prestadores."});
  }
};

export const getPrestador = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const prestador = await prisma.prestador.findUnique({
      where: {id: Number(id)},
    });
    if (!prestador)
      return res.status(404).json({error: "Prestador não encontrado."});
    res.json(prestador);
  } catch (error) {
    res.status(400).json({error: "Erro ao buscar prestador."});
  }
};

export const createPrestador = async (req: Request, res: Response) => {
  try {
    const {usuarioId, descricao} = req.body;
    const prestador = await prisma.prestador.create({
      data: {usuarioId, descricao},
    });
    res.status(201).json(prestador);
  } catch (error) {
    res.status(400).json({error: "Erro ao criar prestador."});
  }
};

export const updatePrestador = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const prestador = await prisma.prestador.update({
      where: {id: Number(id)},
      data,
    });
    res.json(prestador);
  } catch (error) {
    res.status(400).json({error: "Erro ao atualizar prestador."});
  }
};

export const deletePrestador = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    await prisma.prestador.delete({where: {id: Number(id)}});
    res.status(204).send();
  } catch (error) {
    res.status(400).json({error: "Erro ao excluir prestador."});
  }
};
