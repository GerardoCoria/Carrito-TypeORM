import { MigrationInterface, QueryRunner } from "typeorm";

export class init1677789726085 implements MigrationInterface {
    name = 'init1677789726085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products_category_categories" ("productsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_119e80e2f1e483e123a03a37064" PRIMARY KEY ("productsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4aa91342ff0cdf2e0851efd9dc" ON "products_category_categories" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a98d32aa0a94206767fb9e9b97" ON "products_category_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "products_category_categories" ADD CONSTRAINT "FK_4aa91342ff0cdf2e0851efd9dc6" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_category_categories" ADD CONSTRAINT "FK_a98d32aa0a94206767fb9e9b97b" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_category_categories" DROP CONSTRAINT "FK_a98d32aa0a94206767fb9e9b97b"`);
        await queryRunner.query(`ALTER TABLE "products_category_categories" DROP CONSTRAINT "FK_4aa91342ff0cdf2e0851efd9dc6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a98d32aa0a94206767fb9e9b97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4aa91342ff0cdf2e0851efd9dc"`);
        await queryRunner.query(`DROP TABLE "products_category_categories"`);
    }

}
