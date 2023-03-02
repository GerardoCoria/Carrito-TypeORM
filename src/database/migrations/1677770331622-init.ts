import { MigrationInterface, QueryRunner } from "typeorm";

export class init1677770331622 implements MigrationInterface {
    name = 'init1677770331622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
    }

}
