import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664584620446 implements MigrationInterface {
    name = 'default1664584620446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` DROP FOREIGN KEY \`FK_756e09f144f920a71b38f9c272e\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` CHANGE \`customerOrderId\` \`customerOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`validate\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`validate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP FOREIGN KEY \`FK_566f85ed132d9ad6bf62d592325\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` CHANGE \`customerId\` \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` ADD CONSTRAINT \`FK_756e09f144f920a71b38f9c272e\` FOREIGN KEY (\`customerOrderId\`) REFERENCES \`tbuser\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD CONSTRAINT \`FK_566f85ed132d9ad6bf62d592325\` FOREIGN KEY (\`customerId\`) REFERENCES \`tbuser\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP FOREIGN KEY \`FK_566f85ed132d9ad6bf62d592325\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` DROP FOREIGN KEY \`FK_756e09f144f920a71b38f9c272e\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` CHANGE \`customerId\` \`customerId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD CONSTRAINT \`FK_566f85ed132d9ad6bf62d592325\` FOREIGN KEY (\`customerId\`) REFERENCES \`tbuser\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`validate\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`validate\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` CHANGE \`customerOrderId\` \`customerOrderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` ADD CONSTRAINT \`FK_756e09f144f920a71b38f9c272e\` FOREIGN KEY (\`customerOrderId\`) REFERENCES \`tbuser\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
