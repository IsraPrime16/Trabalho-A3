document.addEventListener("DOMContentLoaded", () => {
    // Elementos do DOM
    const valorVenda = document.getElementById("valor-venda");
    const custoProduto = document.getElementById("custo-produto");
    const frete = document.getElementById("frete");
    const imposto = document.getElementById("imposto");
    const tarifaVenda = document.getElementById("tarifa-venda");
    const descontoPromo = document.getElementById("desconto-promo");
    const margemContainer = document.getElementById("margem");
    const promoContainer = document.getElementById("promo-container");
    const margemComPromo = document.getElementById("margem-com-promo");
    const valorComPromo = document.getElementById("valor-com-promo");

    // Função para calcular a margem de contribuição
    const calcularMargem = () => {
        const venda = parseFloat(valorVenda.value) || 0;
        const custo = parseFloat(custoProduto.value) || 0;
        const freteValor = parseFloat(frete.value) || 0;
        const impostoPercent = parseFloat(imposto.value) || 0;
        const tarifaPercent = parseFloat(tarifaVenda.value) || 0;

        // Cálculos
        const custosExtras = freteValor + (venda * impostoPercent / 100) + (venda * tarifaPercent / 100);
        const margemBruta = venda - (custo + custosExtras);
        const margemPercentual = (margemBruta / venda) * 100;

        // Atualizar exibição
        margemContainer.textContent = `R$ ${margemBruta.toFixed(2)} (${margemPercentual.toFixed(2)}%)`;

        // Verificar Promoção
        calcularPromocao(venda, margemBruta);
    };

    // Função para calcular os valores com promoção
    const calcularPromocao = (venda, margemBruta) => {
        const descontoPercent = parseFloat(descontoPromo.value) || 0;

        if (descontoPercent > 0) {
            const valorComDesconto = venda - (venda * descontoPercent / 100);
            const margemBrutaComPromo = margemBruta - (venda - valorComDesconto);
            const margemPercentualComPromo = (margemBrutaComPromo / valorComDesconto) * 100;

            // Atualizar exibição
            valorComPromo.textContent = `R$ ${valorComDesconto.toFixed(2)}`;
            margemComPromo.textContent = `R$ ${margemBrutaComPromo.toFixed(2)} (${margemPercentualComPromo.toFixed(2)}%)`;

            promoContainer.style.display = "block";
        } else {
            promoContainer.style.display = "none";
        }
    };

    // Eventos de entrada
    [valorVenda, custoProduto, frete, imposto, tarifaVenda, descontoPromo].forEach(input => {
        input.addEventListener("input", calcularMargem);
    });
});
