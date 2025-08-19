import { beforeEach } from "vitest";
import { describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/prisma/in-memory/in-memory-checkins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("should be able to check in", async () => {

    const { checkIn } = await sut.execute({
      gymId: "user-01",
      userId: "user-01"
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

});
