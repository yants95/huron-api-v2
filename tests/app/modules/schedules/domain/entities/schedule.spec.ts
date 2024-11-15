import { SchedulePropsBuilder } from "!tests/app/modules/schedules/builders/schedule.builder";
import { Entity } from "#/core/domain/entities/entity";
import { Ulid } from "#/core/domain/value-objects/ulid";
import { Schedule } from "#/modules/schedules/domain/entities/schedule";
import { ScheduleId } from "#/modules/schedules/domain/value-objects/schedule-id";

describe("Schedule", () => {
  describe(".restore()", () => {
    it("should be able to restore a schedule", () => {
      const id = ScheduleId.create(Ulid.new());
      const props = new SchedulePropsBuilder().build();

      const restore = () => Schedule.restore({ id, props });

      expect(restore).not.toThrow();
      const schedule = restore();
      expect(schedule).toBeDefined();
      expect(Entity.isEntity(schedule)).toBeTruthy();
    });
  });

  describe(".create()", () => {
    it("should be able to create schedule", () => {
      const props = new SchedulePropsBuilder().build();

      const creation = () => Schedule.create(props);

      const schedule = creation();
      expect(schedule).toBeDefined();
      const hasAddedScheduleCreatedDomainEvent = schedule.pullDomainEvents()
      expect(hasAddedScheduleCreatedDomainEvent).toBeTruthy();
    });
  })
})