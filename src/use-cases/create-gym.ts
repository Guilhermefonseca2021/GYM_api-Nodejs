import { Gym, User } from "@prisma/client";
import { hash } from "bcrypt";
import { UsersAlreadyExistsError } from "./errors/user-already-exists-erro";
import { GymRepository } from "@/repositories/prisma/gyms-repository";

interface CreateGymCaseRequest {
  name: string;
  description: string | null; 
  phone: number;
  latitude: number;
  longitude: number
}

interface CreateGymCaseResponse {
  gym: Gym
}

export class CreateGymCase {
  constructor(private userRepository: GymRepository) {}

  async execute({
    name,    
    description,
    phone,
    latitude,
    longitude
  }: CreateGymCaseRequest): Promise<CreateGymCaseResponse> {

  }
}
