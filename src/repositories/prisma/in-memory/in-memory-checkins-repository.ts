import { Checkin, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../check-ins-repositories";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: Checkin[] = [];

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<Checkin | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn: Checkin = {
      id: randomUUID(),
      user_id: data.user_id, // <- nome correto
      gym_id: data.gym_id, // <- nome correto
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null, // <- nome correto
      createdAt: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
