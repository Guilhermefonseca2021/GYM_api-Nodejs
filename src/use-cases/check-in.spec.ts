import { InMemoryCheckInsRepository } from "@/repositories/prisma/in-memory/in-memory-checkins-repository";
import { InMemoryGymsRepository } from "@/repositories/prisma/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);
    // i want all dates fictions data
    vi.useFakeTimers();

    gymsRepository.items.push({
      id: "gym-01",
      name: "Js Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
      createdAt: new Date(),
    });
  });

  afterEach(() => {
    vi.useRealTimers(); // back to normal dates, case the others tests will suffer
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.0747279,
        userLongitude: -49.4889672,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in onm distant gym.", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      name: "Js Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
      createdAt: new Date(),
    });

    expect(() =>
      sut.execute({
        gymId: "gym-2",
        userId: "user-1",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
