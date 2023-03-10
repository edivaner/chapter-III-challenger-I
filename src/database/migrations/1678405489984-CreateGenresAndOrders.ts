import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGenresAndOrders1678405489984 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7432" PRIMARY KEY ("id"))');

    await queryRunner.query('CREATE TABLE "genres_game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "id_genres" uuid NOT NULL, "id_game" uuid NOT NULL,  CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7434" PRIMARY KEY ("id"))');

    await queryRunner.query('CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "id_users" uuid NOT NULL, "id_game" uuid NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7435" PRIMARY KEY ("id"))')

    await queryRunner.query(
      'ALTER TABLE "orders" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d" FOREIGN KEY ("id_game") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

    await queryRunner.query(
      'ALTER TABLE "orders" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad33d" FOREIGN KEY ("id_users") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

    await queryRunner.query(
      'ALTER TABLE "genres_game" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad33E" FOREIGN KEY ("id_genres") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

    await queryRunner.query(
      'ALTER TABLE "genres_game" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad33A" FOREIGN KEY ("id_game") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "genres" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d"',
    );
    await queryRunner.query(
      'ALTER TABLE "genres" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad33d"',
    );
    await queryRunner.query(
      'ALTER TABLE "genres_game" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad33E"',
    );
    await queryRunner.query(
      'ALTER TABLE "genres_game" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad33A"',
    );

    await queryRunner.query('DROP TABLE "genres_game"');
    await queryRunner.query('DROP TABLE "orders"');
    await queryRunner.query('DROP TABLE "genres"');
  }

}
