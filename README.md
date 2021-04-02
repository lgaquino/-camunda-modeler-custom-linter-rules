# -camunda-modeler-custom-linter-rules
Regras adicionais criadas para o plugin de lint do camunda modeler

# Introdução
O modeler do camunda permite que sejam colocados plugins para diversas funcionalidades extras. Dentre elas, o [camunda-modeler-linter-plugin](https://github.com/camunda/camunda-modeler-linter-plugin) faz uma avaliação do desenho do processo, segundo um conjunto de regras de boas práticas. 

Para criar suas próprias regras, é preciso instalar um plugin adicional ([camunda-modeler-custom-linter-rules-plugin](https://github.com/camunda/camunda-modeler-custom-linter-rules-plugin)) e, nele programar suas regras customizadas. Dentro do arquivo zip, coloquei o plugin de regras customizadas, já com as regras que criei. 

# Instalação
Para instalá-las no modeler do Camunda, basta extrair o zip na pasta *{{camunda modeler}}\resources\plugins*.

Ao abrir o modeler, com os dois plugins instalados, irá aparecer um botão com a quantidade de erros e avisos na parte inferior da tela (os plugins também podem ser ativados pelo menu superior). Clicando no referido botão, os erros e avisos serão apresentados junto aos elementos do desenho do processo, conforme apresentado nas imagens abaixo.

## Imagens


### Ativando o linter
![Ativando Linter](https://github.com/lgaquino/-camunda-modeler-custom-linter-rules/blob/main/screenshot.png)

### Ativando o linter via menu (ou verificando se foi instalado corretamente)
![Ativando Linter via menu](https://github.com/lgaquino/-camunda-modeler-custom-linter-rules/blob/main/screenshot2.png)

### Validação efetuada
![Validação efetuada](https://github.com/lgaquino/-camunda-modeler-custom-linter-rules/blob/main/screenshot3.png)

