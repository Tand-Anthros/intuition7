import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { TypesStore } from "./typesStore";
import debug from "debug";
const log = debug("portfolio");

export const createPortfolio = async ({deep, Types, packageName, packageId}: {
  deep: DeepClient,
  packageName: string,
  Types: TypesStore,
  packageId: number,
}) => {
  const {
    ContainId,
    SymbolId,
    TypeId,
    StringId,
    ValueId,
    NumberId,
  } = Types;
  console.log({packageName, ContainId, SymbolId, TypeId, StringId, ValueId, NumberId});

  // Portfolio
  const { data: [{ id: PortfolioId }] } = await deep.insert({
    type_id: TypeId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'Portfolio' } },
      },
    ] },
    out: { data: [
    ] },
  });
  log({PortfolioId});

  // portfolioValue
  const { data: [{ id: waletValueId }] } = await deep.insert({
    type_id: ValueId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'portfolioValue' } },
      },
    ] },
    from_id: PortfolioId,
    to_id: NumberId,
  });
  log({waletValueId});

  // SymbolId (петличка от Portfolio к Portfolio)
  const { data: [{ id: symbolId }] } = await deep.insert({
    type_id: SymbolId,
    string: { data: { value: '💼' } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'symbol' } },
      },
    ] },
    from_id: PortfolioId,
    to_id: PortfolioId,
  });
  log({symbolId});

  // Name
  const { data: [{ id: NameId }] } = await deep.insert({
    type_id: TypeId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'Name' } },
      },
    ] },
    from_id: PortfolioId,
    to_id: PortfolioId,
  });
  log({NameId});

  // nameSymbol (петличка от Name к Name)
  const { data: [{ id: nameSymbolId }] } = await deep.insert({
    type_id: SymbolId,
    string: { data: { value: '🔤' } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'nameSymbol' } },
      },
    ] },
    from_id: NameId,
    to_id: NameId,
  });
  log({nameSymbolId});

  // nameValue
  const { data: [{ id: nameValueId }] } = await deep.insert({
    type_id: ValueId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'nameValue' } },
      },
    ] },
    from_id: NameId,
    to_id: StringId,
  });
  log({nameValueId});

  const WalletId = await deep.id('@suenot/wallet', 'Wallet');

  // ContainWallet
  const { data: [{ id: ContainWalletId }] } = await deep.insert({
    type_id: TypeId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'ContainWallet' } },
      },
    ] },
    from_id: PortfolioId,
    to_id: WalletId,
  });
  log({ContainWalletId});

  // Avatar
  const { data: [{ id: AvatarId }] } = await deep.insert({
    type_id: TypeId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'Avatar' } },
      },
    ] },
    from_id: PortfolioId,
    to_id: PortfolioId,
  });
  log({AvatarId});

  // avatarSymbol
  const { data: [{ id: avatarSymbolId }] } = await deep.insert({
    type_id: SymbolId,
    string: { data: { value: '🖼️' } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'avatarSymbol' } },
      },
    ] },
    from_id: AvatarId,
    to_id: AvatarId,
  });
  log({avatarSymbolId});

  // avatarValue
  const { data: [{ id: avatarValueId }] } = await deep.insert({
    type_id: ValueId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'avatarValue' } },
      },
    ] },
    from_id: AvatarId,
    to_id: StringId,
  });
  log({avatarValueId});

  // Description
  const { data: [{ id: DescriptionId }] } = await deep.insert({
    type_id: TypeId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'Description' } },
      },
    ] },
    from_id: PortfolioId,
    to_id: PortfolioId,
  });
  log({DescriptionId});

  // descriptionSymbol
  const { data: [{ id: descriptionSymbolId }] } = await deep.insert({
    type_id: SymbolId,
    string: { data: { value: '✍️' } },
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'descriptionSymbol' } },
      },
    ] },
    from_id: DescriptionId,
    to_id: DescriptionId,
  });
  log({descriptionSymbolId});

  // descriptionValue
  const { data: [{ id: descriptionValueId }] } = await deep.insert({
    type_id: ValueId,
    in: { data: [
      {
        type_id: ContainId,
        from_id: packageId,
        string: { data: { value: 'descriptionValue' } },
      },
    ] },
    from_id: DescriptionId,
    to_id: StringId,
  });
  log({descriptionValueId});

  return {packageId, PortfolioId, symbolId, NameId, nameSymbolId, ContainWalletId, AvatarId, avatarSymbolId, avatarValueId, DescriptionId, descriptionSymbolId, descriptionValueId};
};