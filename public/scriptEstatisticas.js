//ver 0001 ver(atingir peso especifico)0002
document.addEventListener('DOMContentLoaded', () => { //CONTROLE DE VER (ERROS meta e display)
    const weightCtx = document.getElementById('weightChart').getContext('2d');
    const waterCtx = document.getElementById('waterChart').getContext('2d');
    const setGoalButton = document.getElementById('set-goal-button');
    const goalDisplay = document.getElementById('goal-display');

    const progressMessage = document.createElement('div');
    progressMessage.id = 'progress-message';
    progressMessage.classList.add('goal-text');
    document.body.appendChild(progressMessage);

    const plans = {

        A1: "Plano para ganhar peso dentro do intervalo [60, 70] kg. Objetivo: Aumentar o peso para a faixa entre 61 e 70 kg com foco em ganho muscular e ingestão calórica elevada.<br><br>"
        + "<strong>Segunda-feira</strong><br>Café da manhã: 3 ovos mexidos com 1/2 abacate (100g), 2 fatias de pão integral, 1 copo de leite integral (250ml).<br>Lanche da manhã: 30g de nozes e 1 banana.<br>Almoço: 150g de peito de frango grelhado, 100g de arroz integral, 100g de batata-doce, salada verde à vontade com azeite.<br>Lanche da tarde: 200g de iogurte natural com 50g de granola.<br>Jantar: 150g de peixe grelhado (ex.: salmão), 100g de quinoa, 100g de legumes cozidos (cenoura, brócolis).<br>Treino: Treino de força para corpo inteiro (exercícios compostos: agachamento, levantamento terra, supino, remada).<br><br>"
        + "<strong>Terça-feira</strong><br>Café da manhã: Mingau de aveia com 60g de aveia, 200ml de leite integral, 1 colher de mel, 1 maçã fatiada.<br>Lanche da manhã: 30g de amêndoas e 1 pera.<br>Almoço: 150g de carne magra (patinho ou alcatra), 100g de macarrão integral, 50g de purê de batata, legumes salteados.<br>Lanche da tarde: 1 shake de proteína (30g de whey protein) com 200ml de leite integral.<br>Jantar: 2 fatias de pizza integral de frango com queijo e vegetais.<br>Treino: Cardio leve (20-30 minutos de caminhada rápida) + alongamento.<br><br>"
        + "<strong>Quarta-feira</strong><br>Café da manhã: 2 ovos cozidos, 1 fatia de pão integral com pasta de amendoim (20g), 1 suco de laranja (200ml).<br>Lanche da manhã: 1 iogurte grego com 20g de mel.<br>Almoço: 150g de filé de frango, 80g de batata-doce assada, salada verde com azeite.<br>Lanche da tarde: 1 banana com 1 colher de sopa de manteiga de amendoim.<br>Jantar: Omelete com 3 ovos, espinafre, tomate e queijo (50g).<br>Treino: Treino de força para membros superiores (supino, desenvolvimento com halteres, rosca bíceps).<br><br>"
        + "<strong>Quinta-feira</strong><br>Café da manhã: 50g de aveia com 200ml de leite, frutas vermelhas (50g) e 1 colher de mel.<br>Lanche da manhã: 20g de amêndoas e 1 maçã.<br>Almoço: 150g de carne moída magra, 100g de arroz integral, 100g de brócolis cozido.<br>Lanche da tarde: 1 barra de proteína.<br>Jantar: 150g de tilápia grelhada, 100g de purê de batata, salada de folhas verdes.<br>Treino: Cardio moderado (30 minutos de corrida leve).<br><br>"
        + "<strong>Sexta-feira</strong><br>Café da manhã: 3 panquecas integrais com mel e frutas (ex.: morango).<br>Lanche da manhã: 1 shake de proteína (30g de whey) com 200ml de leite integral.<br>Almoço: 200g de frango assado, 100g de quinoa, salada de cenoura e beterraba.<br>Lanche da tarde: 1 maçã e 10g de amendoim.<br>Jantar: 150g de carne de porco magra, purê de abóbora (100g), legumes assados.<br>Treino: Treino de perna (agachamento, leg press, extensão de perna).<br><br>"
        + "<strong>Sábado</strong><br>Café da manhã: Mingau de aveia com banana e pasta de amendoim (30g).<br>Lanche da manhã: 1 iogurte grego com frutas vermelhas.<br>Almoço: 150g de carne magra, 100g de batata doce, legumes cozidos (cenoura, brócolis).<br>Lanche da tarde: 1 shake de proteína (30g de whey) com leite.<br>Jantar: Pizza caseira com massa integral, frango e vegetais.<br>Treino: Treino de corpo inteiro, intensidade leve.<br><br>"
        + "<strong>Domingo</strong><br>Café da manhã: Omelete de 3 ovos com tomate, espinafre e queijo (30g).<br>Lanche da manhã: 30g de castanhas e frutas secas.<br>Almoço: Hambúrguer caseiro de carne magra no pão integral com salada.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Wrap de frango com vegetais.<br>Descanso: Dia de descanso ativo ou alongamento.<br><br>",
    
        A2: "Plano para perder peso dentro do intervalo [60, 70] kg. Objetivo: Reduzir o peso, mantendo a massa magra com um déficit calórico.<br><br>"
        + "<strong>Segunda-feira</strong><br>Café da manhã: Smoothie de espinafre com 1 maçã, gengibre, e 200ml de leite de amêndoas.<br>Lanche da manhã: 1 iogurte desnatado com morangos (50g).<br>Almoço: 150g de filé de frango, 80g de quinoa, salada de rúcula e alface.<br>Lanche da tarde: 1 maçã e 10g de amêndoas.<br>Jantar: 150g de tilápia grelhada com abobrinha e brócolis cozidos.<br>Treino: HIIT (30 minutos de treino intervalado).<br><br>"
        + "<strong>Terça-feira</strong><br>Café da manhã: 2 ovos mexidos, 1 fatia de pão integral e 1 xícara de chá verde.<br>Lanche da manhã: 1 pera.<br>Almoço: 150g de carne magra grelhada, salada de cenoura, pepino e espinafre.<br>Lanche da tarde: Iogurte desnatado com frutas vermelhas (50g).<br>Jantar: Omelete de 3 ovos com espinafre e tomate.<br>Treino: Treino de resistência muscular (foco em membros inferiores).<br><br>"
        + "<strong>Quarta-feira</strong><br>Café da manhã: Mingau de aveia (50g) com morangos e 200ml de leite de amêndoas.<br>Lanche da manhã: 1 maçã.<br>Almoço: 150g de peito de frango, 80g de arroz integral, salada de brócolis e abobrinha.<br>Lanche da tarde: 10g de castanhas e 1 iogurte natural.<br>Jantar: Sopa de legumes (abobrinha, cenoura, brócolis) com 100g de filé de peixe.<br>Treino: Cardio (corrida leve de 30 minutos).<br><br>"
        + "<strong>Quinta-feira</strong><br>Café da manhã: Iogurte com 30g de aveia e mel.<br>Lanche da manhã: 1 pera e 10g de nozes.<br>Almoço: 150g de peixe grelhado, 60g de quinoa, salada verde.<br>Lanche da tarde: Shake com leite de amêndoas, 1 banana e canela.<br>Jantar: 150g de peito de frango com espinafre.<br>Treino: HIIT (20 minutos de treino intenso).<br><br>"
        + "<strong>Sexta-feira</strong><br>Café da manhã: 2 ovos cozidos, 1 fatia de pão integral.<br>Lanche da manhã: 1 iogurte com frutas vermelhas.<br>Almoço: 150g de carne grelhada com legumes assados (cenoura, brócolis).<br>Lanche da tarde: 1 maçã e 10g de amêndoas.<br>Jantar: Omelete de espinafre com tomate.<br>Treino: Cardio (caminhada rápida de 30 minutos).<br><br>"
        + "<strong>Sábado</strong><br>Café da manhã: Smoothie de abacate com espinafre, leite de amêndoas e 1 banana.<br>Lanche da manhã: 1 iogurte natural com frutas vermelhas (50g).<br>Almoço: 150g de peito de frango grelhado, 80g de quinoa e legumes cozidos.<br>Lanche da tarde: Shake com 30g de proteína.<br>Jantar: Sopa de legumes (abóbora, espinafre) com 100g de peixe.<br>Treino: Exercícios de resistência (foco em membros superiores).<br><br>"
        + "<strong>Domingo</strong><br>Café da manhã: Omelete de 2 ovos com espinafre e tomate.<br>Lanche da manhã: 30g de castanhas.<br>Almoço: Salada de atum com alface, rúcula e tomate.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Wrap de peito de frango com vegetais.<br>Descanso: Alongamento e descanso ativo.<br><br>",

        B1: "Plano para ganhar peso dentro do intervalo [71, 80] kg. Objetivo: Aumentar o peso para a faixa entre 71 e 80 kg com foco em ganho muscular e ingestão calórica elevada.<br><br>"
        + "<strong>Segunda-feira</strong><br>Café da manhã: 4 ovos mexidos com 1/2 abacate (100g), 2 fatias de pão integral, 1 copo de leite integral (250ml).<br>Lanche da manhã: 40g de nozes e 1 banana.<br>Almoço: 200g de peito de frango grelhado, 120g de arroz integral, 100g de batata-doce, salada verde à vontade com azeite.<br>Lanche da tarde: 250g de iogurte natural com 60g de granola.<br>Jantar: 200g de peixe grelhado (ex.: salmão), 150g de quinoa, 150g de legumes cozidos (cenoura, brócolis).<br>Treino: Treino de força para corpo inteiro (exercícios compostos: agachamento, levantamento terra, supino, remada).<br><br>"
        + "<strong>Terça-feira</strong><br>Café da manhã: Mingau de aveia com 80g de aveia, 200ml de leite integral, 1 colher de mel, 1 maçã fatiada.<br>Lanche da manhã: 40g de amêndoas e 1 pera.<br>Almoço: 200g de carne magra (patinho ou alcatra), 120g de macarrão integral, 60g de purê de batata, legumes salteados.<br>Lanche da tarde: 1 shake de proteína (40g de whey protein) com 250ml de leite integral.<br>Jantar: 3 fatias de pizza integral de frango com queijo e vegetais.<br>Treino: Cardio leve (20-30 minutos de caminhada rápida) + alongamento.<br><br>"
        + "<strong>Quarta-feira</strong><br>Café da manhã: 3 ovos cozidos, 1 fatia de pão integral com pasta de amendoim (30g), 1 suco de laranja (250ml).<br>Lanche da manhã: 1 iogurte grego com 25g de mel.<br>Almoço: 200g de filé de frango, 120g de batata-doce assada, salada verde com azeite.<br>Lanche da tarde: 1 banana com 1 colher de sopa de manteiga de amendoim.<br>Jantar: Omelete com 4 ovos, espinafre, tomate e queijo (60g).<br>Treino: Treino de força para membros superiores (supino, desenvolvimento com halteres, rosca bíceps).<br><br>"
        + "<strong>Quinta-feira</strong><br>Café da manhã: 70g de aveia com 250ml de leite, frutas vermelhas (70g) e 1 colher de mel.<br>Lanche da manhã: 30g de amêndoas e 1 maçã.<br>Almoço: 200g de carne moída magra, 120g de arroz integral, 150g de brócolis cozido.<br>Lanche da tarde: 1 barra de proteína.<br>Jantar: 200g de tilápia grelhada, 150g de purê de batata, salada de folhas verdes.<br>Treino: Cardio moderado (30 minutos de corrida leve).<br><br>"
        + "<strong>Sexta-feira</strong><br>Café da manhã: 4 panquecas integrais com mel e frutas (ex.: morango).<br>Lanche da manhã: 1 shake de proteína (40g de whey) com 250ml de leite integral.<br>Almoço: 250g de frango assado, 120g de quinoa, salada de cenoura e beterraba.<br>Lanche da tarde: 1 maçã e 20g de amendoim.<br>Jantar: 200g de carne de porco magra, purê de abóbora (150g), legumes assados.<br>Treino: Treino de perna (agachamento, leg press, extensão de perna).<br><br>"
        + "<strong>Sábado</strong><br>Café da manhã: Mingau de aveia com banana e pasta de amendoim (40g).<br>Lanche da manhã: 1 iogurte grego com frutas vermelhas.<br>Almoço: 200g de carne magra, 120g de batata doce, legumes cozidos (cenoura, brócolis).<br>Lanche da tarde: 1 shake de proteína (40g de whey) com leite.<br>Jantar: Pizza caseira com massa integral, frango e vegetais.<br>Treino: Treino de corpo inteiro, intensidade leve.<br><br>"
        + "<strong>Domingo</strong><br>Café da manhã: Omelete de 4 ovos com tomate, espinafre e queijo (40g).<br>Lanche da manhã: 40g de castanhas e frutas secas.<br>Almoço: Hambúrguer caseiro de carne magra no pão integral com salada.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Wrap de frango com vegetais.<br>Descanso: Dia de descanso ativo ou alongamento.<br><br>",

    B2: "Plano para perder peso dentro do intervalo [71, 80] kg. Objetivo: Reduzir o peso, mantendo a massa magra com um déficit calórico.<br><br>"
        + "<strong>Segunda-feira</strong><br>Café da manhã: Smoothie de espinafre com 1 maçã, gengibre, e 250ml de leite de amêndoas.<br>Lanche da manhã: 1 iogurte desnatado com morangos (70g).<br>Almoço: 200g de filé de frango, 100g de quinoa, salada de rúcula e alface.<br>Lanche da tarde: 1 maçã e 15g de amêndoas.<br>Jantar: 200g de tilápia grelhada com abobrinha e brócolis cozidos.<br>Treino: HIIT (30 minutos de treino intervalado).<br><br>"
        + "<strong>Terça-feira</strong><br>Café da manhã: 3 ovos mexidos, 1 fatia de pão integral e 1 xícara de chá verde.<br>Lanche da manhã: 1 pera.<br>Almoço: 200g de carne magra grelhada, salada de cenoura, pepino e espinafre.<br>Lanche da tarde: Iogurte desnatado com frutas vermelhas (70g).<br>Jantar: Omelete de 4 ovos com espinafre e tomate.<br>Treino: Treino de resistência muscular (foco em membros inferiores).<br><br>"
        + "<strong>Quarta-feira</strong><br>Café da manhã: Mingau de aveia (60g) com morangos e 250ml de leite de amêndoas.<br>Lanche da manhã: 1 maçã.<br>Almoço: 200g de peito de frango, 100g de arroz integral, salada de brócolis e abobrinha.<br>Lanche da tarde: 15g de castanhas e 1 iogurte natural.<br>Jantar: Sopa de legumes (abobrinha, cenoura, brócolis) com 150g de filé de peixe.<br>Treino: Cardio (corrida leve de 40 minutos).<br><br>"
        + "<strong>Quinta-feira</strong><br>Café da manhã: Iogurte com 40g de aveia e mel.<br>Lanche da manhã: 1 pera e 20g de nozes.<br>Almoço: 200g de peixe grelhado, 100g de quinoa, salada verde.<br>Lanche da tarde: Shake com leite de amêndoas, 1 banana e canela.<br>Jantar: 200g de peito de frango com espinafre.<br>Treino: HIIT (20 minutos de treino intenso).<br><br>"
        + "<strong>Sexta-feira</strong><br>Café da manhã: 3 ovos cozidos, 1 fatia de pão integral.<br>Lanche da manhã: 1 iogurte com frutas vermelhas.<br>Almoço: 200g de carne grelhada com legumes assados (cenoura, brócolis).<br>Lanche da tarde: 1 maçã e 15g de amêndoas.<br>Jantar: Omelete de espinafre com tomate.<br>Treino: Cardio (caminhada rápida de 40 minutos).<br><br>"
        + "<strong>Sábado</strong><br>Café da manhã: Smoothie de abacate com leite de amêndoas e cacau.<br>Lanche da manhã: 1 iogurte natural.<br>Almoço: 150g de peito de frango com salada de tomate e pepino.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Salada de folhas verdes com peixe grelhado.<br>Treino: Treino de resistência para membros superiores.<br><br>"
        + "<strong>Domingo</strong><br>Café da manhã: Omelete com espinafre, cogumelos e queijo.<br>Lanche da manhã: 20g de castanhas.<br>Almoço: 200g de frango grelhado com legumes cozidos.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Wrap de alface com peito de frango.<br>Descanso: Atividade leve como caminhada.<br><br>",

        C1: "Plano para ganhar peso dentro do intervalo [81, 90] kg. Objetivo: Aumentar peso com foco em hipertrofia muscular.<br><br>"
        + "<strong>Segunda-feira</strong><br>Café da manhã: 3 ovos mexidos, 1 fatia de pão integral com abacate.<br>Lanche da manhã: 1 maçã e 30g de castanhas.<br>Almoço: 250g de peito de frango grelhado, 120g de arroz integral, legumes cozidos.<br>Lanche da tarde: Shake de proteína (40g de whey) com leite integral.<br>Jantar: 200g de carne magra grelhada, 150g de batata-doce, salada.<br>Treino: Treino de força (exercícios compostos).<br><br>"
        + "<strong>Terça-feira</strong><br>Café da manhã: Aveia com mel e frutas vermelhas.<br>Lanche da manhã: Iogurte natural com granola.<br>Almoço: 200g de carne magra, 150g de arroz integral, legumes assados.<br>Lanche da tarde: 1 shake de proteína.<br>Jantar: Pizza integral com vegetais.<br>Treino: Cardio (corrida de 30 minutos).<br><br>"
        + "<strong>Quarta-feira</strong><br>Café da manhã: 4 ovos cozidos com 1 fatia de pão integral e 1 xícara de chá verde.<br>Lanche da manhã: 1 iogurte grego com frutas vermelhas.<br>Almoço: 200g de filé de peixe grelhado, 100g de batata-doce, salada verde.<br>Lanche da tarde: 30g de nozes e 1 banana.<br>Jantar: 200g de frango grelhado, 150g de arroz integral, brócolis cozidos.<br>Treino: Treino de força para membros superiores (supino, desenvolvimento, rosca bíceps).<br><br>"
        + "<strong>Quinta-feira</strong><br>Café da manhã: Mingau de aveia com banana e mel.<br>Lanche da manhã: 1 maçã e 30g de amêndoas.<br>Almoço: 250g de carne magra grelhada, 120g de quinoa, salada de folhas verdes.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Frango grelhado com legumes (cenoura, abobrinha).<br>Treino: Cardio (corrida leve de 40 minutos).<br><br>"
        + "<strong>Sexta-feira</strong><br>Café da manhã: Panquecas de aveia com mel e frutas vermelhas.<br>Lanche da manhã: 1 barra de proteína.<br>Almoço: 200g de carne moída, 120g de arroz integral, salada.<br>Lanche da tarde: 1 shake de proteína com leite integral.<br>Jantar: 200g de tilápia grelhada com purê de batata-doce.<br>Treino: Treino de pernas (agachamento, leg press).<br><br>"
        + "<strong>Sábado</strong><br>Café da manhã: Smoothie de banana, aveia e leite integral.<br>Lanche da manhã: 30g de castanhas e 1 maçã.<br>Almoço: 200g de peito de frango grelhado, 100g de quinoa, salada de alface e pepino.<br>Lanche da tarde: Shake de proteína com 250ml de leite.<br>Jantar: 200g de peixe grelhado com arroz integral e legumes.<br>Treino: Treino de corpo inteiro com foco em força.<br><br>"
        + "<strong>Domingo</strong><br>Café da manhã: Omelete com 4 ovos, queijo e espinafre.<br>Lanche da manhã: 1 maçã com 20g de amêndoas.<br>Almoço: 250g de carne magra, 120g de arroz integral, legumes assados.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Wrap integral com peito de frango e salada.<br>Descanso: Alongamento ou descanso ativo.<br><br>",

    C2: "Plano para perder peso dentro do intervalo [81, 90] kg. Objetivo: Reduzir peso com dieta hipocalórica e treino cardiovascular.<br><br>"
        + "<strong>Segunda-feira</strong><br>Café da manhã: Smoothie de abacate, 1 banana, espinafre e 250ml de leite de amêndoas.<br>Lanche da manhã: 1 iogurte natural.<br>Almoço: 200g de filé de peixe grelhado, 100g de quinoa, salada verde.<br>Lanche da tarde: 1 maçã.<br>Jantar: 200g de peito de frango grelhado com espinafre.<br>Treino: HIIT (25 minutos).<br><br>"
        + "<strong>Terça-feira</strong><br>Café da manhã: Ovos mexidos com espinafre.<br>Lanche da manhã: 1 maçã.<br>Almoço: 200g de carne grelhada, legumes no vapor.<br>Lanche da tarde: 1 shake de proteína.<br>Jantar: 150g de tilápia grelhada, salada de abobrinha e pepino.<br>Treino: Cardio (30 minutos de corrida).<br><br>"
        + "<strong>Quarta-feira</strong><br>Café da manhã: Iogurte natural com 40g de aveia e frutas vermelhas.<br>Lanche da manhã: 1 pera.<br>Almoço: 200g de peito de frango grelhado, 100g de arroz integral, salada de folhas verdes.<br>Lanche da tarde: 1 punhado de amêndoas e 1 maçã.<br>Jantar: Sopa de legumes com filé de peixe grelhado.<br>Treino: Cardio (30 minutos de caminhada rápida).<br><br>"
        + "<strong>Quinta-feira</strong><br>Café da manhã: 1 fatia de pão integral com 2 ovos mexidos e tomate.<br>Lanche da manhã: 1 maçã com 15g de castanhas.<br>Almoço: 200g de carne magra grelhada, 100g de purê de batata-doce, salada de pepino.<br>Lanche da tarde: 1 shake de proteína.<br>Jantar: 200g de peixe grelhado, legumes assados.<br>Treino: HIIT (20 minutos).<br><br>"
        + "<strong>Sexta-feira</strong><br>Café da manhã: Smoothie de espinafre, 1 maçã e leite de amêndoas.<br>Lanche da manhã: 1 barra de proteína.<br>Almoço: 200g de peito de frango grelhado, 100g de quinoa, salada de tomate e pepino.<br>Lanche da tarde: 1 shake de proteína.<br>Jantar: Omelete com espinafre e cogumelos.<br>Treino: Cardio (corrida de 40 minutos).<br><br>"
        + "<strong>Sábado</strong><br>Café da manhã: Mingau de aveia com mel e frutas.<br>Lanche da manhã: 1 iogurte desnatado.<br>Almoço: 200g de carne grelhada, 100g de arroz integral, legumes assados.<br>Lanche da tarde: 1 shake de proteína.<br>Jantar: Sopa de legumes com peixe grelhado.<br>Treino: Treino de resistência muscular (exercícios compostos).<br><br>"
        + "<strong>Domingo</strong><br>Café da manhã: Omelete com espinafre e queijo branco.<br>Lanche da manhã: 1 maçã com 20g de amêndoas.<br>Almoço: 200g de carne magra, 100g de quinoa, legumes cozidos.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Wrap de alface com peito de frango.<br>Descanso: Atividade leve (caminhada).<br><br>",

    D1: "Plano para ganhar peso dentro do intervalo [91, 100] kg. Objetivo: Foco em hipertrofia, aumentando massa muscular com alto consumo calórico.<br><br>"
        + "<strong>Segunda-feira</strong><br>Café da manhã: Omelete com 4 ovos, queijo e tomate.<br>Lanche da manhã: 1 shake de proteína.<br>Almoço: 300g de peito de frango, 150g de arroz integral.<br>Lanche da tarde: 1 maçã com pasta de amendoim.<br>Jantar: 200g de carne grelhada com batata-doce.<br>Treino: Treino de força para membros inferiores.<br><br>"
        + "<strong>Terça-feira</strong><br>Café da manhã: Mingau de aveia com frutas vermelhas.<br>Lanche da manhã: Iogurte natural com mel.<br>Almoço: 250g de carne magra, 120g de quinoa.<br>Lanche da tarde: 1 barra de proteína.<br>Jantar: Sopa de legumes com peixe grelhado.<br>Treino: Cardio moderado.<br><br>"
        + "<strong>Quarta-feira</strong><br>Café da manhã: Smoothie de banana e aveia com leite integral.<br>Lanche da manhã: 30g de castanhas e 1 maçã.<br>Almoço: 250g de peito de frango, 150g de batata-doce, salada.<br>Lanche da tarde: 1 shake de proteína com leite integral.<br>Jantar: 200g de carne grelhada com quinoa e legumes.<br>Treino: Treino de força (agachamento, deadlift).<br><br>"
        + "<strong>Quinta-feira</strong><br>Café da manhã: 4 ovos mexidos com cogumelos e tomate.<br>Lanche da manhã: 1 maçã com pasta de amendoim.<br>Almoço: 200g de carne magra, 150g de arroz integral, legumes assados.<br>Lanche da tarde: 1 shake de proteína.<br>Jantar: Tilápia grelhada com legumes.<br>Treino: Cardio (corrida moderada de 30 minutos).<br><br>"
        + "<strong>Sexta-feira</strong><br>Café da manhã: Panquecas de aveia com mel e frutas vermelhas.<br>Lanche da manhã: 1 barra de proteína.<br>Almoço: 250g de carne magra, 120g de quinoa, salada.<br>Lanche da tarde: 1 shake de proteína com leite integral.<br>Jantar: 200g de peixe grelhado com batata-doce.<br>Treino: Treino de força (exercícios compostos).<br><br>"
        + "<strong>Sábado</strong><br>Café da manhã: Mingau de aveia com mel e frutas vermelhas.<br>Lanche da manhã: 30g de nozes.<br>Almoço: 300g de carne grelhada, 150g de arroz integral.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Sopa de legumes com peito de frango.<br>Treino: Treino de resistência para membros inferiores.<br><br>"
        + "<strong>Domingo</strong><br>Café da manhã: Omelete com 4 ovos, queijo e espinafre.<br>Lanche da manhã: 1 maçã com 30g de amêndoas.<br>Almoço: 300g de carne magra, 120g de arroz integral.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Wrap integral com peito de frango.<br>Descanso: Caminhada leve.<br><br>",

    D2: "Plano para perder peso dentro do intervalo [91, 100] kg. Objetivo: Reduzir gordura corporal enquanto mantém a massa magra.<br><br>"
        + "<strong>Segunda-feira</strong><br>Café da manhã: 2 ovos mexidos com espinafre e tomate.<br>Lanche da manhã: 1 maçã.<br>Almoço: 200g de frango grelhado com 100g de arroz integral.<br>Lanche da tarde: 1 shake de proteína.<br>Jantar: 200g de peixe grelhado com legumes.<br>Treino: HIIT.<br><br>"
        + "<strong>Terça-feira</strong><br>Café da manhã: Iogurte com aveia.<br>Lanche da manhã: 20g de nozes.<br>Almoço: 200g de carne magra com legumes.<br>Lange da tarde: 1 shake de proteína.<br>Jantar: Sopa de legumes.<br>Treino: Cardio de intensidade moderada.<br><br>"
        + "<strong>Quarta-feira</strong><br>Café da manhã: Smoothie de abacate e leite de amêndoas.<br>Lanche da manhã: 1 maçã.<br>Almoço: 200g de peixe grelhado, 100g de quinoa, salada.<br>Lanche da tarde: 1 barra de proteína.<br>Jantar: 150g de peito de frango grelhado com brócolis e batata-doce.<br>Treino: Cardio (corrida leve).<br><br>"
        + "<strong>Quinta-feira</strong><br>Café da manhã: 1 fatia de pão integral com queijo branco e abacate.<br>Lanche da manhã: 1 pera.<br>Almoço: 200g de carne magra grelhada, 100g de arroz integral, legumes cozidos.<br>Lanche da tarde: 1 shake de proteína.<br>Jantar: 200g de peixe grelhado com legumes no vapor.<br>Treino: HIIT (intensidade média).<br><br>"
        + "<strong>Sexta-feira</strong><br>Café da manhã: Omelete com espinafre e cogumelos.<br>Lanche da manhã: 1 maçã.<br>Almoço: 200g de peito de frango grelhado, 100g de quinoa, salada.<br>Lanche da tarde: 1 shake de proteína.<br>Jantar: Sopa de legumes com peixe grelhado.<br>Treino: Cardio (caminhada rápida).<br><br>"
        + "<strong>Sábado</strong><br>Café da manhã: Smoothie de banana, espinafre e leite de amêndoas.<br>Lanche da manhã: 1 maçã.<br>Almoço: 200g de frango grelhado, 100g de arroz integral, salada de folhas verdes.<br>Lanche da tarde: Shake de proteína.<br>Jantar: 150g de tilápia grelhada com legumes cozidos.<br>Treino: Cardio leve.<br><br>"
        + "<strong>Domingo</strong><br>Café da manhã: 2 ovos mexidos com cogumelos.<br>Lanche da manhã: 1 maçã.<br>Almoço: 200g de carne magra grelhada, 100g de arroz integral, legumes.<br>Lanche da tarde: Shake de proteína.<br>Jantar: Sopa de legumes.<br>Descanso: Atividade leve.<br><br>"

    };

    function displayGoal(data) {
        if (data && data.goal) {
            goalDisplay.innerHTML = `<h2>Meta Selecionada: ${data.goal} kg</h2>`;
            checkProgress(data.goal);
        } else {
            goalDisplay.innerHTML = '';
            progressMessage.textContent = '';
        }
    }
    


    // Seleciona o elemento da caixa de informações
const planInfoText = document.getElementById('plan-info-text');

function checkProgress(goalWeight) {
    fetch('/history')
        .then(response => response.json())
        .then(history => {
            if (history.length === 0) {
                progressMessage.textContent = "Nenhum dado de histórico encontrado para avaliar a meta.";
                return;
            }

            const currentWeight = parseFloat(history[history.length - 1].weight);
            const goal = parseFloat(goalWeight);

            if (Math.abs(currentWeight - goal) < 0.01) {
                progressMessage.textContent = "Parabéns! Você atingiu a meta!";
                progressMessage.style.color = "green";
            } else {
                progressMessage.textContent = "Ainda não atingiu a meta, continue tentando!";
                progressMessage.style.color = "red";
            }

            let plan = '';
            if (goal >= 60 && goal <= 70) {
                plan = currentWeight < goal ? 'A1' : 'A2';
            } else if (goal >= 71 && goal <= 80) {
                plan = currentWeight < goal ? 'B1' : 'B2';
            } else if (goal >= 81 && goal <= 90) {
                plan = currentWeight < goal ? 'C1' : 'C2';
            } else if (goal >= 91 && goal <= 100) {
                plan = currentWeight < goal ? 'D1' : 'D2';
            }

            if (plan) {
                // Exibe a descrição completa do plano apenas na caixa de informações lateral
                planInfoText.innerHTML = plans[plan];
            }
        })
        .catch(error => console.error("Erro ao verificar progresso:", error));
}


        
    
    
    

    function loadHistory() {
        fetch('/history')
            .then(response => response.json())
            .then(data => {
                const labels = data.map((_, index) => `Dia ${index + 1}`);
                const weights = data.map(entry => entry.weight);
                const waterIntake = data.map(entry => entry.water);

                new Chart(weightCtx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Peso (kg)',
                            data: weights,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: true,
                        }],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Peso (kg)',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Dias',
                                },
                            },
                        },
                    },
                });

                new Chart(waterCtx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Hidratação (litros)',
                            data: waterIntake,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            fill: true,
                        }],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Litros',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Dias',
                                },
                            },
                        },
                    },
                });
            })
            .catch(error => console.error("Erro ao carregar o histórico:", error));

        fetch('/current-goal')
            .then(response => response.json())
            .then(displayGoal)
            .catch(error => console.error("Erro ao carregar meta:", error));
    }

    setGoalButton.addEventListener('click', () => {
        const goalWeight = parseFloat(prompt("Digite sua meta de peso (entre 60 e 100 kg):"));
    
        if (goalWeight && goalWeight >= 60 && goalWeight <= 100) {
            fetch('/set-goal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ goal: goalWeight }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Atualiza diretamente o conteúdo de goalDisplay
                    goalDisplay.innerHTML = `<h2>Meta Selecionada: ${goalWeight} kg</h2>`;
                    displayGoal({ goal: goalWeight });
                } else {
                    alert("Erro ao definir meta. Tente novamente.");
                }
            })
            .catch(error => console.error("Erro ao definir a meta:", error));
        } else {
            alert("Peso inválido! Insira um valor entre 60 e 100 kg.");
        }
    });
    

    loadHistory();
});
