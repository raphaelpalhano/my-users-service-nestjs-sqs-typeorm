export const userAge = (dataNascimento: string | Date) => {
  const dataAtual = new Date();
  const partesDataNascimento = dataNascimento.toString().split('-');
  const anoNascimento = parseInt(partesDataNascimento[0]);
  const mesNascimento = parseInt(partesDataNascimento[1]) - 1; // Os meses são baseados em zero
  const diaNascimento = parseInt(partesDataNascimento[2]);

  let idade = dataAtual.getFullYear() - anoNascimento;

  // Verificar se o aniversário já ocorreu este ano
  if (
    dataAtual.getMonth() < mesNascimento ||
    (dataAtual.getMonth() === mesNascimento &&
      dataAtual.getDate() < diaNascimento)
  ) {
    idade--;
  }

  return idade;
};
