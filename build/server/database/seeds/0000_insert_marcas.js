"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const ETableNames_1 = require("../ETableNames");
const seed = (knex) => __awaiter(void 0, void 0, void 0, function* () {
    const [{ count }] = yield knex(ETableNames_1.ETableNames.marca).count('* as count');
    if (!Number.isInteger(count) || Number(count) > 0)
        return;
    const marcasToInsert = carBrands.map(nomeMarca => ({ nome: nomeMarca }));
    yield knex(ETableNames_1.ETableNames.marca).insert(marcasToInsert);
});
exports.seed = seed;
const carBrands = [
    "Toyota",
    "Volkswagen",
    "Ford",
    "Honda",
    "Chevrolet",
    "Nissan",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Hyundai",
    "Kia",
    "Renault",
    "Peugeot",
    "Fiat",
    "Mazda",
    "Subaru",
    "Mitsubishi",
    "Lexus",
    "Land Rover",
    "Jaguar",
    "Volvo",
    "Porsche",
    "Jeep",
    "Dodge",
    "Ram",
    "Chrysler",
    "Buick",
    "Cadillac",
    "GMC",
    "Acura",
    "Infiniti",
    "Lincoln",
    "Tesla",
    "Ferrari",
    "Lamborghini",
    "Maserati",
    "Bentley",
    "Rolls-Royce",
    "Aston Martin",
    "Alfa Romeo",
    "Bugatti",
    "Genesis",
    "Mini",
    "Suzuki",
    "Saab",
    "Citroën",
    "SEAT",
    "Skoda",
    "Opel",
    "Holden",
    "Isuzu",
    "Daihatsu",
    "McLaren",
    "Pagani",
    "Koenigsegg",
    "Hummer",
    "Pontiac",
    "Saturn",
    "Oldsmobile",
    "Fisker",
    "Rivian",
    "Lucid",
    "Polestar",
    "Smart",
    "Scion",
    "MG",
    "Rover",
    "Lada",
    "Tata",
    "Mahindra",
    "Great Wall",
    "Geely",
    "BYD",
    "Chery",
    "BAIC",
    "FAW",
    "Dongfeng",
    "Zotye",
    "Haval",
    "Proton",
    "Perodua",
    "SsangYong",
    "Daewoo",
    "Maruti Suzuki",
    "Datsun",
    "Plymouth",
    "Studebaker",
    "Packard",
    "DeLorean",
    "Spyker",
    "Wiesmann",
    "Mosler",
    "Saleen",
    "Vector",
    "Noble",
    "TVR",
    "Gumpert",
    "Caterham",
    "Morgan",
    "Zenvo",
    "Faraday Future"
];
