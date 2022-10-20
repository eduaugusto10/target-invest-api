import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664830170452 implements MigrationInterface {
    name = 'default1664830170452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` ADD \`create_time\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`create_time\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`create_time\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tborders\` ADD \`create_time\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` ADD \`date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tborders\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`tborders\` ADD \`date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tborders\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`tborders\` ADD \`date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` ADD \`date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tborders\` DROP COLUMN \`create_time\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`create_time\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`create_time\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomerorders\` DROP COLUMN \`create_time\``);
    }

}
