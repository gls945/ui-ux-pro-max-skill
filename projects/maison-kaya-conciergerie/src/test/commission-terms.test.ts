import { describe, expect, it } from "vitest";
import { COMMISSION_TERMS, INSTAGRAM_URL } from "../lib/site";

describe("Maison Kaya commercial terms", () => {
  it("uses a single 20 percent commission", () => {
    expect(COMMISSION_TERMS.rate).toBe(20);
  });
  it("bases commission on received net rent after platform fees", () => {
    expect(COMMISSION_TERMS.basis).toBe("revenus locatifs nets perçus, après les frais de la plateforme");
  });
  it("bills the five specified operating costs separately", () => {
    expect(COMMISSION_TERMS.separateFees).toEqual(["Ménage", "Blanchisserie", "Consommables", "Réparations", "Interventions"]);
  });
  it("uses a quote or an announced price for additional services", () => {
    expect(COMMISSION_TERMS.pricing).toBe("devis ou tarif annoncé");
  });
  it("links to the supplied Instagram account", () => {
    expect(INSTAGRAM_URL).toBe("https://www.instagram.com/kaya.conciergerie/");
  });
});