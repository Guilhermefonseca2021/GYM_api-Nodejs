import { GymRepository } from "@/repositories/prisma/gyms-repository";
import { Gym } from "@prisma/client";

interface CreateGymCaseRequest {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymCaseRequest): Promise<CreateGymCaseResponse> {
    const gym = await this.gymsRepository.create({
      name,
      latitude,
      longitude,
      description,
      phone,
    });
    return {
      gym,
    };
  }
}
