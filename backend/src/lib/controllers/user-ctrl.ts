import { Request, Response } from "express";
import UserRepository from "../repositories/user-repo";
import UserFactory from "../factories/user-factory";
import AuthService from "../services/auth";
import { Role } from "../models/user";

async function getUsers(req: Request, res: Response) {
  const user = AuthService.getCurrentUser(req);

  if (!user) {
    res.status(401);
    return res.send("Unauthorized");
  }

  const repo = UserRepository.getInstance();
  try {
    const users = await repo.listUsers();
    return res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function addUsers(req: Request, res: Response) {
  const user = AuthService.getCurrentUser(req);

  if (!user) {
    res.status(401);
    return res.send("Unauthorized");
  }

  const { role, emails } = req.body;

  if (!role) {
    res.status(400).send("Missing required body `role`");
    return;
  }

  if (role !== Role.Admin && role !== Role.Editor && role !== Role.Publisher) {
    res.status(400).send("Invalid role value");
    return;
  }

  if (!emails) {
    res.status(400).send("Missing required body `emails`");
    return;
  }

  const userEmails = (emails as string).split(",");

  for (const userEmail of userEmails) {
    if (!emailIsValid(userEmail)) {
      res.status(400).send(`Invalid email: ${userEmail}`);
      return;
    }
  }

  const repo = UserRepository.getInstance();
  try {
    await repo.addUsers(
      userEmails.map((email) => UserFactory.createNew(email, role))
    );
    return res.send();
  } catch (error) {
    res.status(500).send(error);
  }
}

function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default {
  getUsers,
  addUsers,
};