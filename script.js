// Captura os elementos do DOM
const valorVendaInput = document.getElementById('valor-venda');
const custoProdutoInput = document.getElementById('custo-produto');
const freteInput = document.getElementById('frete');
const impostoInput = document.getElementById('imposto');
const tarifaInput = document.getElementById('tarifa-venda');
const promoInput = document.getElementById('desconto-promo');

const margemEl = document.getElementById('margem');
const promoContainer = document.getElementById('promo-container');
const valorComPromoEl = document.getElementById('valor-com-promo');
const margemComPromoEl = document.getElementById('margem-com-promo');

const percentRadio = document.getElementById('percent');
const valorRadio = document.getElementById('valor');

// Função para calcular a margem
function calcularMargem() {
    const valorVenda = parseFloat(valorVendaInput.value) || 0;
    const custoProduto = parseFloat(custoProdutoInput.value) || 0;
    const frete = parseFloat(freteInput.value) || 0;
    const imposto = parseFloat(impostoInput.value) || 0;
    const tarifa = parseFloat(tarifaInput.value) || 0;
    const promo = parseFloat(promoInput.value) || 0;

    const tarifaCalculada = percentRadio.checked ? (tarifa / 100) * valorVenda : tarifa;
    const custosTotais = custoProduto + frete + tarifaCalculada + (imposto / 100) * valorVenda;

    const margem = valorVenda - custosTotais;
    const margemPercentual = (margem / valorVenda) * 100;

    // Aplica a cor dependendo da margem
    margemEl.textContent = `R$ ${margem.toFixed(2)} (${margemPercentual.toFixed(2)}%)`;
    margemEl.className = margem < 0 ? 'highlight negative' : 'highlight positive'; 

    if (promo > 0) {
        const valorComPromo = valorVenda * (1 - promo / 100);
        const margemComPromo = valorComPromo - custosTotais;
        const margemComPromoPercentual = (margemComPromo / valorComPromo) * 100;

        promoContainer.style.display = 'block';
        valorComPromoEl.textContent = `R$ ${valorComPromo.toFixed(2)}`;
        margemComPromoEl.textContent = `R$ ${margemComPromo.toFixed(2)} (${margemComPromoPercentual.toFixed(2)}%)`;
        margemComPromoEl.className = margemComPromo < 0 ? 'highlight negative' : 'highlight positive';
    } else {
        promoContainer.style.display = 'none';
    }
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calcularMargem);
});
