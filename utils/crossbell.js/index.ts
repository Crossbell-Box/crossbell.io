import { Indexer } from "crossbell.js";
import { Contract } from "crossbell.js";

const cont = new Contract(typeof window !== "undefined" ? (<any>window).ethereum : null);
cont.connect();

export const indexer = new Indexer();
export const contract = cont;
