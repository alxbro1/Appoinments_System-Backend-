import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "credencials",
})
export class Credential {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    unique: true,
    length: 30,
  })
  username: string;

  @Column({
    length: 100,
  })
  password: string;
}