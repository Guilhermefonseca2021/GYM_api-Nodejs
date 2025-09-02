import { GymRepository } from "@/repositories/prisma/gyms-repository";
import { Checkin } from "@prisma/client";
import { CheckInsRepository } from "../repositories/prisma/check-ins-repositories";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: Checkin;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymRepository: GymRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );
    const gym = await this.gymRepository.findById(gymId);

    if(!gym) {
      throw new ResourceNotFoundError
    }
    
    const distance = getDistanceBetweenCoordinates({latitude: userLatitude, longitude: userLongitude}, {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()})

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if(distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
