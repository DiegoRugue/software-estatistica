function entrada(){
   var vetor = [];
   //coleta de dados e nome da variavel
   var dados = (document.getElementById("coleta").value);
   var nomevar = (document.getElementById("nomevar").value);
   var valorsep1 = (document.getElementById('selectQ').value);
   var valorsep2 = (document.getElementById('selectK').value);
   var valorsep3 = (document.getElementById('selectD').value);
   var valorsep4 = (document.getElementById('selectP').value);

   if (valorsep1 != "") {
        var valorsep = valorsep1;
   } else if (valorsep2 != "") {
        var valorsep = valorsep2;
   } else if (valorsep3 != "") {
        var valorsep = valorsep3;
   } else if (valorsep4 != "") {
        var valorsep = valorsep4;
   } else {
    var valorsep = 0;
   }

   //separa todos os elementos entre ;
    var separatriz = 1;
   vetor = dados.split(";");
   for (let i = 0; i < vetor.length; i++) {
       vetor[i] = vetor[i].replace(",",".")
       
   }

       //process é o tipo de processo pesquisado = 1 amostra(estimação) 2 população(censo) {Diego entra aqui e coloca isso no botão}
       var proces1 = (document.getElementById("proces1").checked);
       //verifica se não é um numero(NaN)
   if (isNaN(vetor[0]) != true) {
       //transformando string em number
       for (let i = 0; i < vetor.length; i++) {
          vetor[i] = parseFloat(vetor[i]);

       } 
       //passagem de parametros
       var left = 0;
       var right = vetor.length;
       //executa a função de ordenação
       quicksort(vetor,left,right);
       //executa a função quantitativa
       quantitativa(vetor,nomevar,proces1,separatriz,valorsep);
       
   } 
    else {
        //deixa todas os dados em letra maiuscula e remove espaços em branco no começo e final da string
        for (var i = 0; i < vetor.length; i++) {
            vetor[i] = vetor[i].toUpperCase();
            vetor[i] = vetor[i].trim();
        }
        //ordena o vetor de letras
        vetor.sort();
        //passagem de parametros executa a qualitativa
        qualitativa(vetor,nomevar);
    }
   separatrizes(vetor,valorsep,separatriz)
}



/*###################################################################################################################################
##                              /função para ordenação de dados quick sorte                                                        ##
/####################################################################################################################################*/




function particao(vetor, left, right){
    var i, j, aux;
    i = left;
    for (j = left + 1; j <= right; ++j) {
        if (vetor[j] < vetor[left]){
            ++i;
            aux = vetor[i];
            vetor[i] = vetor[j];
            vetor[j] = aux;
        }
    }
    aux = vetor[left];
    vetor[left] = vetor[i];
    vetor[i] = aux;
    return i;
} 

function quicksort(vetor, left, right){
    var r;
    if (right > left){
        r = particao(vetor, left, right);
        quicksort(vetor, left, r-1);
        quicksort(vetor, r+1, right);
    }
}
//fim da ordenação



/*###################################################################################################################################
##                              função qualitativa com sequencia logica ou alfabetica                                              ##
/####################################################################################################################################*/



function qualitativa(vetor,nomevar) {
    var elemento = []; var quantidade = []; var tabela = [];
    //passando dados para vetor local
    for (let i = 0; i < vetor.length; i++) {
        elemento[i] = vetor[i];
    }
    //new set exclui todos elementos iguais
    var elemento = [...new Set(vetor)];
    var cont = 0;
    var totalV = 0;
    //totalV é o total de elementos , cont é a quantidade de cada elemento
    for (let i = 0; i < elemento.length; i++) {
        cont = 0;
        for (let j = 0; j < vetor.length; j++) {
            if (elemento[i] == vetor[j]) {
                cont++;
                totalV++;
            }
        }
        //coloca a quantidade no vetor
        quantidade[i] = cont;
    }
    //media moda e mediana são tratados a baixo
    var media = "Processos estatisticos qualitativos não tem média. ";
    var aux = 0;
    var cont = 0;
    //pega o maior numero da quantidade.
    for (let i = 0; i < quantidade.length; i++) {
        if(quantidade[i] >= aux){
            aux = quantidade[i];
        }
    }
    var moda = "";
    //trabalha a moda
    for (var i = 0; i < quantidade.length; i++) {
        //se tiver 2 numeros maiores iguais ele é encontrado aqui , e mostrado a moda
        if (aux == quantidade[i]) {
            moda = moda + " " + elemento[i];
            cont++;
        }
        //se todos forem iguais , não existe moda
        if (cont == quantidade.length) {
            moda = " Não tem moda";
        }
    }
    //acha a posição do meio e a proxima.
        var posicao = totalV/2
        //se o numero for par , ele compara se a posição achada o elemento é o mesmo da posição posterior
        if (totalV % 2 == 0) {
            if (vetor[posicao - 1] == vetor[posicao]) {
                //se for igual ele já declara que aquela é a mediana
             mediana = vetor[posicao];   
            } else {
                //se não for aqui ele mostra os 2 elementos como mediana 
                mediana = vetor[posicao] + " e " + vetor[posicao - 1];
            }
        } 
        else {
            //se a posição for impar , ele da o numero da posição direto arredondando a posição com a função pronta math.round
            mediana = vetor[Math.round(posicao)];
        }
        var fac = 0;
        var facpor = 0;
        //inicia a criação da tabela HTML
        var exibe =
                        "<thead>" + 
                            "<tr>" + 
                                "<th align=center>" + nomevar + "</th>" + 
                                "<th align=center> Frequencia </th>" + 
                                "<th align=center> FR % </th>" + 
                                "<th align=center> Fac </th>" + 
                                "<th align=center> Fac % </th>" + 
                            "</tr>" + 
                        "</thead>" + 

                        "<tbody>";
        
        //cria um objeto que contem a % FR , o FAC , e a % FAC os 3 dentro de 1 posição do vetor que declarei como TABELA
    for (let i = 0; i < elemento.length; i++) {
        var objeto = new Object ();
        objeto.frpor = (quantidade[i]*100)/totalV;
        objeto.fac = fac = fac + quantidade[i];

        objeto.facpor = facpor = facpor + objeto.frpor;
        //aqui o vetor tabela recebe os 3 objetos
        tabela.push(objeto);
        //continua a criação da tabela HTML
        exibe = exibe + "<tr>" + 
                            "<td align=center>" + elemento[i] + "</td>" + 
                            "<td align=center>" + quantidade[i]  + "</td>" + 
                            "<td align=center>" + tabela[i].frpor.toFixed(2) + "% </td>" + 
                            "<td align=center>" + tabela[i].fac + "</td>" + 
                            "<td align=center>" + tabela[i].facpor.toFixed(2) + "% </td>" +
                        "</tr>";
    }
    //saida de dados
    exibe = exibe + "</tbody> </table>";
    document.getElementById("mmm").innerHTML = ("Media: " + media + "<br>" + " Moda: " + moda + "<br>" + " Mediana: " + mediana);
    document.getElementById("exibe").innerHTML = exibe;
    moda = "";
     var data=[]; var chart=[];
   var optionspizza={
        aspectRatio: 2,                       
        title:{
          display:true,
          text:"pesquisa:"+nomevar,
          fontSize:15,
          borderWidth:100
        
        },
        legend:{
          display:true,
          position:'bottom',
          labels:{
            fontColor:'#000'
          }
        },
        
        layout:{
          padding:{
            left:0,
            right:150,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }


      }
    for (let i = 0; i <elemento.length; i++) {
        chart[i]=elemento[i];    
    };
    for (let i = 0; i < quantidade.length; i++) {
        data[i]= quantidade[i];
        
    };
    var label=optionspizza;

        

    graficoQuali(chart,data,label);
    var graficoVar;
    
        function graficoQuali(chart,data,label){
        
            var ctx = document.getElementById("myChart").getContext('2d');
            if(graficoVar != null){
                graficoVar.destroy();
            }
         
            graficoVar = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: chart,
                datasets: [
                    {
                        label: nomevar,
                        data: data,
                        backgroundColor:[
                            'rgba(72, 61, 139, 0.6)',
                
                            'rgba(0, 0, 255, 0.6)',           
                
                            'rgba(34, 139, 34, 0.6)',
                
                            'rgba(255, 255, 0, 0.6)',
                
                            'rgba(255, 0, 0, 0.6)',
                
                            'rgba(0, 255, 127, 0.6)',            
                
                            'rgba(255, 140, 0, 0.6)',
                
                            'rgba(54, 162, 235, 0.6)',
                
                            'rgba(255, 206, 86, 0.6)',
                
                            'rgba(75, 192, 192, 0.6)',
                
                            'rgba(255, 99, 132, 0.6)',
                
                            'rgba(25, 25, 112, 0.6)',
                
                            'rgba(100, 149, 237, 0.6)',
                
                            'rgba(0, 250, 154, 0.6)',
                            
                            'rgba(165, 42, 42, 0.6)',
                
                            'rgba(148, 0, 211, 0.6)',
                
                            'rgba(153, 102, 255, 0.6)',
                
                            'rgba(255, 159, 64, 0.6)',
                
                            'rgba(205, 69, 102, 0.6)',
                
                            'rgba(47, 79, 79, 0.6)',
                
                            'rgba(119, 136, 153, 0.6)'
                
                
                          ],
                          borderWidth:1,
                          borderColor:'#777',
                          hoverBorderWidth:3,
                          hoverBorderColor:'#000'
                        }],
                      },
                      options:label
                   
                    }
                    );
                 
                }
                function attgrafico() {
                    removeData(Chart);
                function removeData(chart) {
                  chart.data.labels.pop();
                  chart.data.datasets.forEach((dataset) => {
                      dataset.data.pop();
                  });
                  chart.update();
              };
              addData(chart,label,data);
              function addData(chart, label, data) {
                  chart.data.labels.push(label);
                  chart.data.datasets.forEach((dataset) => {
                      dataset.data.push(data);
                  });
                  chart.update();
              };          
  
                } 
}
//fim da função qualitativa


/*###################################################################################################################################
##                              começa a função quantitativa recebendo e passando parametros     ~Continua                         ##
/####################################################################################################################################*/



function quantitativa(vetor,nomevar,proces1,separatriz,valorsep) {
    //elemento para discreta element para continua , quantidade para discreta quant para continua;
    var elemento = []; var quantidade = []; var tabela = []; var classe = []; var quant = []; var element = []; var amplitude=[];
//grafico 
var chart=[];var data=[];
    //passando dados para vetor local
    for (let i = 0; i < vetor.length; i++) {
        elemento[i] = vetor[i];
    }
    //new set exclui todos elementos iguais
    var elemento = [...new Set(vetor)];
    var cont = 0;
    var totalV = 0;
    //totalV é o total de elementos , cont é a quantidade de cada elemento
    for (let i = 0; i < elemento.length; i++) {
        cont = 0;
        for (let j = 0; j < vetor.length; j++) {
            if (elemento[i] == vetor[j]) {
                cont++;
                totalV++;
            }
        }
        //coloca a quantidade no vetor
        quantidade[i] = cont;
    }
    //caso o elemento tenha mais de 10 elementos diferentes ele será continuo , se tiver menos de 10 será discreto
    if (elemento.length >= 10) {
        separatriz = 0;
        //calculo para achar a amplitude
        var at = vetor[vetor.length-1] - vetor[0];
        //aqui temos o K que é a raiz do total de elementos jogada na var class que usando a função floor arredonda o numero
        var clas = Math.floor(Math.sqrt(totalV));
        //um vetor para 3 diferentes valores do K (1 a mais e um a menos que a raiz achada);
        classe[0] = clas - 1;
        classe[1] = clas;
        classe[2] = clas + 1;
        //uma contadora auxiliar para encerrar meu while , e 2 variaveis para contar o tanto de linhas que terá a tabela , e o intervalo que vai ser contado
        var auxcont = 1;
        var linhas = 0;
        var intervalo = 0;
        //função while para achar o tanto de linhas e intervalo , e assim que encontrar encerra o processo;
        while (auxcont != 0) {
            at++;
          for (let i = 0; i < 3; i++) {
              if (at % classe[i] == 0) {
                  auxcont = 0;
                  linhas = classe[i];
                  intervalo = at/classe[i];
                  break;
              }   
          }
        } 
        //coloco o menor numero do vetor já ordenado para a variavel menor , e o numero de intervalos somados no maior , defino j para contagem dentro do while;
        menorv = vetor[0];
        maior = menorv+intervalo;
        j = 0;
        //percorro o tanto de linhas que tiver , e contanto dentro do while , quantas vezes tem aquela variavel dentro do intervalo de tempo
        for (var i = 0; i < linhas; i++) {
            var cont = 0;
            while (vetor[j] < maior) {
                cont++;
                j++;
            }
            //maior aqui é "arrumado" para dar continuidade na contagem
            maior = maior+intervalo;
            //coloca a quantidade achada dentro do vetor quant
            quant[i] = cont;
        }
        //faço o calculo da media guardando no vetor element e salvo os valores da amplitude de cada classe para o grafico
            media = 0;
        maior = menorv+intervalo;
        for (var i = 0; i < linhas; i++) {
            element[i] = (menorv+maior)/2;
            amplitude[i]=menorv+"├──"+maior;
            menorv = maior;
            maior = maior+intervalo;
        }      
  
        for (var i = 0; i < linhas; i++) {
            media = media + element[i]*quant[i];
        }
        media = media/totalV;
        aux = 0;
        cont = 0;
           //pega o maior numero da quantidade.
        for (let i = 0; i < quant.length; i++) {
            if(quant[i] >= aux){
                aux = quant[i];
            }
        }
        var moda = "";
        for (var i = 0; i < quant.length; i++) {
             //se tiver 2 numeros maiores iguais ele é encontrado aqui , e mostrado a moda
            if (aux == quant[i]) {
                moda = moda + "  " + element[i];
                cont++;
            }
            //se todos forem iguais , não existe moda
            if (cont == quant.length) {
                moda = "Não tem moda";
            }
            
        }

        
        //acha a posição do meio e a proxima.
        var posicao = totalV/2 

            //se o numero for par , ele compara se a posição achada o elemento é o mesmo da posição posterior
            if (totalV % 2 == 0) {
                var classemd = vetor[posicao];   
            }
            else {
                classemd = vetor[Math.round(posicao)];
            } 
            //começa o calculo para achar o limite inferior que será utilizado na mediana
            menorv = vetor[0];
            j = 0;
            liminf = 0;
            for (var i = 0; i < linhas; i++) {
                    if (menorv <= vetor[posicao] && vetor[posicao] < (menorv+intervalo) ) {
                        liminf = menorv;
                }
                menorv = menorv+intervalo;
            }

        maior = menorv+intervalo;
        var fac = 0;
        var facpor = 0;
         //inicia a criação da tabela HTML
        var exibe =
                    "<thead>" + 
                        "<tr>" + 
                            "<th align=center>" + "Classe" + "</th>" +
                            "<th align=center>" + nomevar + "</th>" + 
                            "<th align=center> Frequencia </th>" + 
                            "<th align=center> FR % </th>" + 
                            "<th align=center> Fac </th>" + 
                            "<th align=center> Fac % </th>" + 
                        "</tr>" + 
                    "</thead>" + 

                    "<tbody>";
        
        //cria um objeto que contem a % FR , o FAC , e a % FAC os 3 dentro de 1 posição do vetor que declarei como TABELA
        var tabela2 = [];
        menorv = vetor[0];
        facant = 0;
    for (let i = 0; i < element.length; i++) {
        var objeto2 = new Object ();
        objeto2.frpor = (quant[i]*100)/totalV;
        objeto2.fac = fac = fac + quant[i];

        objeto2.facpor = facpor += objeto2.frpor;

        //aqui o vetor tabela recebe os 3 objetos
        tabela2.push(objeto2);
        //continua a criação da tabela HTML
        exibe = exibe + "<tr>" + 
                        "<td align=center>" + (i+1) + "</td>" + 
                        "<td align=center>" + menorv + "├──" + (menorv+intervalo) + "</td>" + 
                        "<td align=center>" + quant[i] + "</td>" + 
                        "<td align=center>" + tabela2[i].frpor.toFixed(2) + "% </td>" + 
                        "<td align=center>" + tabela2[i].fac + "</td>" + 
                        "<td align=center>" + tabela2[i].facpor.toFixed(2) + "% </td>" +
                    "</tr>";
                    if (liminf > menorv) {
                        if (tabela2[i].fac == 0) {
                            facant = 0;
                        } else {
                            facant = tabela2[i].fac;
                        }
                    }
    menorv = menorv+intervalo;
    }
   
    //calcula a mediana com os dados encontrados nas funções a cima
    mediana = liminf+((posicao-facant)/linhas)*intervalo;
    //calcula medida separatriz
    var res = liminf+((valorsep-facant)/linhas)*intervalo;
    console.log(res);
        //começa o calculo do desvio padrão
        var dp = 0;
            //soma os dados para desvio padrão
        for (let i = 0; i < quant.length; i++) {
            dp = dp + Math.pow((element[i] - media),2)*quant[i];
        }
        if (proces1 === true) {
            //se for amostra
            dp = dp/(totalV -1);
            dp = Math.sqrt(dp);
        } else {
            //se for população
            dp = dp/totalV;
            dp = Math.sqrt(dp);
        }
        //calculo do coeficiente da variação
        var CV = (dp/media)*100;
    
    //saida de dados
    exibe = exibe + "</tbody> </tabela>";
    document.getElementById("mmm").innerHTML = ("Media: "+ media.toFixed(2) + "<br>" + "Moda : " + moda + "<br>" + "Mediana: " + mediana + "<br>" + " O Desvio Padrão é de : " + dp.toFixed(2) + "<br>" + "O Coeficiente de variação é de : " + CV.toFixed(2) + "%");
    document.getElementById("exibe").innerHTML = exibe;

         
    } 

/*###################################################################################################################################
##                              começa a função quantitativa recebendo e passando parametros     ~Discreta                         ##
/####################################################################################################################################*/



    else {
        
        //são tratados a media moda e mediana da qualitativa discreta
        media = 0;
        //faz a soma dos dados 
        for (let i = 0; i < elemento.length; i++) {
            media = media + elemento[i]*quantidade[i];
        }
        media = media/totalV;
        //fim da media
        var aux = 0;
        var cont = 0;
        //pega o maior numero da quantidade.
        for (let i = 0; i < quantidade.length; i++) {
            if(quantidade[i] >= aux){
                aux = quantidade[i];
            }
        }
        var moda = "";
        //trabalha a moda
        for (var i = 0; i < quantidade.length; i++) {
             //se tiver 2 numeros maiores iguais ele é encontrado aqui , e mostrado a moda
            if (aux == quantidade[i]) {
                moda = moda + "  " + elemento[i];
                cont++;
            }
            //se todos forem iguais , não existe moda
            if (cont == quantidade.length) {
                moda = "Não tem moda";
            }
        }
        //acha a posição do meio e a proxima.
            var posicao = totalV/2
            //se o numero for par , ele compara se a posição achada o elemento é o mesmo da posição posterior
            if (totalV % 2 == 0) {
                if (vetor[posicao -1] == vetor[posicao]) {
                //se for igual ele já declara que aquela é a mediana
                 mediana = vetor[posicao];   
                }
                else {
                    //se não for aqui ele mostra o calculo da mediana
                    mediana = (vetor[posicao] + vetor[posicao - 1]) / 2;
                }
            } 
            else {
                 //se a posição for impar , ele da o numero da posição direto arredondando a posição com a função pronta math.round
                mediana = vetor[Math.round(posicao)];
            }
            //começa o calculo do desvio padrão
            var dp = 0;
                //soma os dados para desvio padrão
            for (let i = 0; i < quantidade.length; i++) {
                dp = dp + Math.pow((elemento[i] - media),2)*quantidade[i];
            }
            if (proces1 === true) {
                //se for amostra
                dp = dp/(totalV -1);
                dp = Math.sqrt(dp);
            } else {
                //se for população
                dp = dp/totalV;
                dp = Math.sqrt(dp);
            }
            //calculo do coeficiente da variação
            var CV = (dp/media)*100;
       
            var fac = 0;
            var facpor = 0;
             //inicia a criação da tabela HTML
            var exibe =
                        "<thead>" + 
                            "<tr>" + 
                                "<th align=center>" + nomevar + "</th>" + 
                                "<th align=center> Frequencia </th>" + 
                                "<th align=center> FR % </th>" + 
                                "<th align=center> Fac </th>" + 
                                "<th align=center> Fac % </th>" + 
                            "</tr>" + 
                        "</thead>" + 

                        "<tbody>";
            
            //cria um objeto que contem a % FR , o FAC , e a % FAC os 3 dentro de 1 posição do vetor que declarei como TABELA
        for (let i = 0; i < elemento.length; i++) {
            var objeto = new Object ();
            objeto.frpor = (quantidade[i]*100)/totalV;
            objeto.fac = fac = fac + quantidade[i];
    
            objeto.facpor = facpor = facpor + objeto.frpor;
            //aqui o vetor tabela recebe os 3 objetos
            tabela.push(objeto);
            //continua a criação da tabela HTML
            exibe = exibe + "<tr>" + 
                            "<td align=center>" + elemento[i] + "</td>" + 
                            "<td align=center>" + quantidade[i]  + "</td>" + 
                            "<td align=center>" + tabela[i].frpor.toFixed(2) + "% </td>" + 
                            "<td align=center>" + tabela[i].fac + "</td>" + 
                            "<td align=center>" + tabela[i].facpor.toFixed(2) + "% </td>" +
                        "</tr>";
        }
        // criação do grafico1
     
        //saida de dados
        
        exibe = exibe + "</tbody> </tabela>";
        document.getElementById("mmm").innerHTML = ("Media: "+ media.toFixed(2) + "<br>" + "Moda : " + moda + "<br>" + "Mediana: " + mediana + "<br>" + " O Desvio Padrão é de : " + dp.toFixed(2) + "<br>" + "O Coeficiente de variação é de : " + CV.toFixed(2) + "%");
        document.getElementById("exibe").innerHTML = exibe;
        moda = "";
    }
     var label;
   var optionsc= {
  scales:{
        xAxes:[{
          categoryPercentage:1,
          barPercentage:1
        }],
        yAxes:[{
          ticks:{
            beginAtZero:true
          }
        }]
      },   
   
    title:{
      display:true,
      text:"pesquisa:"+nomevar,
      fontSize:15,
      borderWidth:100
    
    },
    legend:{
        display:true,
        position:'bottom',
        labels:{
          fontColor:'#000'
        }
    },
    
    layout:{
      padding:{
        left:0,
        right:150,
        bottom:0,
        top:0
      }
    },
    tooltips:{
      enabled:true
    }
  }

var optionsp={
    scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        },   
     
      title:{
        display:true,
        text:"pesquisa:"+nomevar,
        fontSize:15,
        borderWidth:100
      
      },
      legend:{
        display:true,
        position:'bottom',
        labels:{
          fontColor:'#000'
        }
      },
      
      layout:{
        padding:{
          left:0,
          right:150,
          bottom:0,
          top:0
        }
      },
      tooltips:{
        enabled:true
      }
    };
    
    

if(amplitude[0]!=null   && isNaN(vetor[0]) != true){        
        for (let i = 0; i <amplitude.length; i++) {
            chart[i]=String(amplitude[i]);
        };
        for (let i = 0; i < quant.length; i++) {
            data[i]= quant[i];
            
        };
        label=optionsc;
         grafico1(chart,data,label);
            } 

    else if(amplitude[0]==null   &&  isNaN(vetor[0])!=true){
        for (let i = 0; i <elemento.length; i++) {
            chart[i]=String(elemento[i]);    
        };
        for (let i = 0; i < quantidade.length; i++) {
            data[i]= quantidade[i];
            
        };
        label=optionsp;
        grafico1(chart,data,label);
            }


var graficoVar;
    function grafico1(chart,data,label){

  
        var ctx = document.getElementById("myChart").getContext('2d');
        if(graficoVar != null){
            graficoVar.destroy();
        }
              
        graficoVar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:chart,
            datasets: [
                {
                    label: nomevar,
                    data: data,
                    backgroundColor:[
                        'rgba(72, 61, 139, 0.6)',
            
                        'rgba(0, 0, 255, 0.6)',           
            
                        'rgba(34, 139, 34, 0.6)',
            
                        'rgba(255, 255, 0, 0.6)',
            
                        'rgba(255, 0, 0, 0.6)',
            
                        'rgba(0, 255, 127, 0.6)',            
            
                        'rgba(255, 140, 0, 0.6)',
            
                        'rgba(54, 162, 235, 0.6)',
            
                        'rgba(255, 206, 86, 0.6)',
            
                        'rgba(75, 192, 192, 0.6)',
            
                        'rgba(255, 99, 132, 0.6)',
            
                        'rgba(25, 25, 112, 0.6)',
            
                        'rgba(100, 149, 237, 0.6)',
            
                        'rgba(0, 250, 154, 0.6)',
                        
                        'rgba(165, 42, 42, 0.6)',
            
                        'rgba(148, 0, 211, 0.6)',
            
                        'rgba(153, 102, 255, 0.6)',
            
                        'rgba(255, 159, 64, 0.6)',
            
                        'rgba(205, 69, 102, 0.6)',
            
                        'rgba(47, 79, 79, 0.6)',
            
                        'rgba(119, 136, 153, 0.6)'
                      ],                                    
                      borderWidth:1,
                      borderColor:'#777',
                      hoverBorderWidth:3,
                      hoverBorderColor:'#000'
                    }],
                  },
                  options:label
                });
              }

console.log({graficoVar});
function attgrafico() {
                  removeData(Chart);
              function removeData(chart) {
                chart.data.labels.pop();
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.pop();
                });
                chart.update();
            };
            addData(chart,label,data);
            function addData(chart, label, data) {
                chart.data.labels.push(label);
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.push(data);
                });
                chart.update();
            };          

} 
}

/*###################################################################################################################################
##                                                 TABELA DISTRIBUIÇÃO NORMAL                                                      ##
/####################################################################################################################################*/


function DistNormal(TDN) {
    var vcalc = [];

    var mediaUni = parseFloat(document.getElementById("media").value);
    var dpUni = parseFloat(document.getElementById("dp").value);
    vcalc[0] = parseFloat(document.getElementById("entre1").value);
    vcalc[1] = parseFloat(document.getElementById("entre2").value);
    var tipdis = document.getElementById('disnselect').value;
    //Z = calculo do vcalc[0]
    //var Z = ((vcalc[0] - mediaUni) / dpUni).toFixed(2);
    var Z = Math.abs(parseFloat(((vcalc[0] - mediaUni) / dpUni)));
    //numeros do vcalc[0]

    var zred = Math.floor(Z*10)/10;
    var zred2 = Math.floor(Z*100)/100;

    
    //transforma o numero em positivo
    if (zred < 0) {
        zred = zred * -1;
        zred2 = zred2 * -1;
    }
    
    //linha e coluna do valorT (primeiro vcalc)
    var linhaM = zred*10;
    var colunaM = Math.round((zred2*100)-(linhaM*10));
    if (linhaM < 0) {
        linhaM = linhaM * -1;
    }
    if (colunaM < 0) {
        colunaM = colunaM * -1;
    }
    var valorT = TDN[linhaM][colunaM];
    
    if (vcalc[1] != 0) {
        var Z2 = Math.abs(parseFloat(((vcalc[1] - mediaUni) / dpUni)));

            //numeros do vcalc[1]
        var zzred = Math.floor(Z2*10)/10;
       var zzred2 = Math.floor(Z2*100)/100;

        if (zzred < 0) {
            zzred = zzred * -1;
            zzred2 = zzred2 * -1;
        }
    
        
        var linhaM2 = zzred*10;
        var colunaM2 = Math.round(zzred2*100)-(linhaM2*10);
        if (linhaM2 < 0) {
            linhaM2 = linhaM2 * -1;
        }
        if (colunaM2 < 0) {
            colunaM2 = colunaM2 * -1;
        }

        var valorT2 = TDN[linhaM2][colunaM2];
    } else {
        ValorT2 = 0;
    }
    var prob = 0;
    //tratando as possibilidades
    if (tipdis == 3) {//menor que a media
        if (vcalc[0] < mediaUni) {
            prob = ((0.5 - valorT)*100).toFixed(2);
        } else {
            prob = ((0.5 + valorT)*100).toFixed(2);
        }
    }
    if (tipdis == 2) { // maior que a media
        if (vcalc[0] > mediaUni) {
            prob = ((0.5 - valorT)*100).toFixed(2);
        } else {
            prob = ((0.5 + valorT)*100).toFixed(2);
        }
    }
    if (tipdis == 1) { //entre 
        if (vcalc[0] == mediaUni) {
            prob = (valorT2)*100;
        } else if (vcalc[1] == mediaUni) {
            prob = valorT*100;
        } else if ((vcalc[0] >= mediaUni && vcalc[1] <= mediaUni) || (vcalc[1] >= mediaUni && vcalc[0] <= mediaUni)){
            prob = (valorT + valorT2) * 100;
        } else if (vcalc[0] > mediaUni && vcalc[1] > mediaUni){
            if (vcalc[0] > vcalc[1]) {
                prob = (valorT - valorT2) * 100;
            }else{
                prob = (valorT2 - valorT) * 100;
            }
        } else if (vcalc[0] < mediaUni && vcalc[1] < mediaUni){
            if (vcalc[0] < vcalc[1]){
                prob = (valorT - valorT2)*100;
            }else{
                prob = (valorT2 - valorT)*100;
            }
        }
        
    }
            document.getElementById("probabil").innerHTML = prob + '%';

        

}

function tabelaDN() {
    
var TDN = [];

for (let i = 0; i < 40; i++) {
    TDN[i] = [];
}

TDN[0][0] = 0.0000; TDN[0][1] = 0.0040; TDN[0][2] = 0.0080; TDN[0][3] = 0.0120; TDN[0][4] = 0.0160;
TDN[1][0] = 0.0398; TDN[1][1] = 0.0438; TDN[1][2] = 0.0478; TDN[1][3] = 0.0517; TDN[1][4] = 0.0557;
TDN[2][0] = 0.0793; TDN[2][1] = 0.0832; TDN[2][2] = 0.0871; TDN[2][3] = 0.0910; TDN[2][4] = 0.0948;
TDN[3][0] = 0.1179; TDN[3][1] = 0.1217; TDN[3][2] = 0.1255; TDN[3][3] = 0.1293; TDN[3][4] = 0.1331;
TDN[4][0] = 0.1554; TDN[4][1] = 0.1591; TDN[4][2] = 0.1628; TDN[4][3] = 0.1664; TDN[4][4] = 0.1700;
TDN[0][5] = 0.0199; TDN[0][6] = 0.0239; TDN[0][7] = 0.0279; TDN[0][8] = 0.0319; TDN[0][9] = 0.0359;
TDN[1][5] = 0.0596; TDN[1][6] = 0.0636; TDN[1][7] = 0.0675; TDN[1][8] = 0.0714; TDN[1][9] = 0.0753;
TDN[2][5] = 0.0987; TDN[2][6] = 0.1026; TDN[2][7] = 0.1064; TDN[2][8] = 0.1103; TDN[2][9] = 0.1141;
TDN[3][5] = 0.1368; TDN[3][6] = 0.1406; TDN[3][7] = 0.1443; TDN[3][8] = 0.1480; TDN[3][9] = 0.1517;
TDN[4][5] = 0.1736; TDN[4][6] = 0.1772; TDN[4][7] = 0.1808; TDN[4][8] = 0.1844; TDN[4][9] = 0.1879;
TDN[5][0] = 0.1915; TDN[5][1] = 0.1950; TDN[5][2] = 0.1985; TDN[5][3] = 0.2019; TDN[5][4] = 0.2054;
TDN[6][0] = 0.2257; TDN[6][1] = 0.2291; TDN[6][2] = 0.2324; TDN[6][3] = 0.2357; TDN[6][4] = 0.2389;
TDN[7][0] = 0.2580; TDN[7][1] = 0.2611; TDN[7][2] = 0.2642; TDN[7][3] = 0.2673; TDN[7][4] = 0.2703;
TDN[8][0] = 0.2881; TDN[8][1] = 0.2910; TDN[8][2] = 0.2939; TDN[8][3] = 0.2967; TDN[8][4] = 0.2995;
TDN[9][0] = 0.3159; TDN[9][1] = 0.3186; TDN[9][2] = 0.3212; TDN[9][3] = 0.3238; TDN[9][4] = 0.3264;
TDN[5][5] = 0.2088; TDN[5][6] = 0.2123; TDN[5][7] = 0.2157; TDN[5][8] = 0.2190; TDN[5][9] = 0.2224;
TDN[6][5] = 0.2422; TDN[6][6] = 0.2454; TDN[6][7] = 0.2486; TDN[6][8] = 0.2517; TDN[6][9] = 0.2549;
TDN[7][5] = 0.2734; TDN[7][6] = 0.2764; TDN[7][7] = 0.2794; TDN[7][8] = 0.2823; TDN[7][9] = 0.2852;
TDN[8][5] = 0.3023; TDN[8][6] = 0.3051; TDN[8][7] = 0.3078; TDN[8][8] = 0.3106; TDN[8][9] = 0.3133;
TDN[9][5] = 0.3289; TDN[9][6] = 0.3315; TDN[9][7] = 0.3340; TDN[9][8] = 0.3365; TDN[9][9] = 0.3389;
TDN[10][0] = 0.3413; TDN[10][1] = 0.3438; TDN[10][2] = 0.3461; TDN[10][3] = 0.3485; TDN[10][4] = 0.3508;
TDN[11][0] = 0.3643; TDN[11][1] = 0.3665; TDN[11][2] = 0.3686; TDN[11][3] = 0.3708; TDN[11][4] = 0.3729;
TDN[12][0] = 0.3849; TDN[12][1] = 0.3869; TDN[12][2] = 0.3888; TDN[12][3] = 0.3907; TDN[12][4] = 0.3925;
TDN[13][0] = 0.4032; TDN[13][1] = 0.4049; TDN[13][2] = 0.4066; TDN[13][3] = 0.4088; TDN[13][4] = 0.4099;
TDN[14][0] = 0.4192; TDN[14][1] = 0.4207; TDN[14][2] = 0.4222; TDN[14][3] = 0.4236; TDN[14][4] = 0.4251;
TDN[10][5] = 0.3531; TDN[10][6] = 0.3554; TDN[10][7] = 0.3577; TDN[10][8] = 0.3599; TDN[10][9] = 0.3621;
TDN[11][5] = 0.3749; TDN[11][6] = 0.3770; TDN[11][7] = 0.3790; TDN[11][8] = 0.3810; TDN[11][9] = 0.3830;
TDN[12][5] = 0.3944; TDN[12][6] = 0.3962; TDN[12][7] = 0.3980; TDN[12][8] = 0.3997; TDN[12][9] = 0.4015;
TDN[13][5] = 0.4115; TDN[13][6] = 0.4131; TDN[13][7] = 0.4147; TDN[13][8] = 0.4162; TDN[13][9] = 0.4177;
TDN[14][5] = 0.4265; TDN[14][6] = 0.4279; TDN[14][7] = 0.4292; TDN[14][8] = 0.4306; TDN[14][9] = 0.4319;
TDN[15][0] = 0.4332; TDN[15][1] = 0.4345; TDN[15][2] = 0.4357; TDN[15][3] = 0.4370; TDN[15][4] = 0.4382;
TDN[16][0] = 0.4452; TDN[16][1] = 0.4463; TDN[16][2] = 0.4474; TDN[16][3] = 0.4484; TDN[16][4] = 0.4495;
TDN[17][0] = 0.4554; TDN[17][1] = 0.4564; TDN[17][2] = 0.4573; TDN[17][3] = 0.4582; TDN[17][4] = 0.4591;
TDN[18][0] = 0.4641; TDN[18][1] = 0.4649; TDN[18][2] = 0.4656; TDN[18][3] = 0.4664; TDN[18][4] = 0.4671;
TDN[19][0] = 0.4713; TDN[19][1] = 0.4719; TDN[19][2] = 0.4729; TDN[19][3] = 0.4732; TDN[19][4] = 0.4738;
TDN[15][5] = 0.4394; TDN[15][6] = 0.4406; TDN[15][7] = 0.4418; TDN[15][8] = 0.4429; TDN[15][9] = 0.4441;
TDN[16][5] = 0.4505; TDN[16][6] = 0.4515; TDN[16][7] = 0.4525; TDN[16][8] = 0.4535; TDN[16][9] = 0.4545;
TDN[17][5] = 0.4599; TDN[17][6] = 0.4608; TDN[17][7] = 0.4616; TDN[17][8] = 0.4626; TDN[17][9] = 0.4633;
TDN[18][5] = 0.4678; TDN[18][6] = 0.4686; TDN[18][7] = 0.4693; TDN[18][8] = 0.4699; TDN[18][9] = 0.4706;
TDN[19][5] = 0.4744; TDN[19][6] = 0.4750; TDN[19][7] = 0.4756; TDN[19][8] = 0.4761; TDN[19][9] = 0.4767;
TDN[20][0] = 0.4772; TDN[20][1] = 0.4778; TDN[20][2] = 0.4783; TDN[20][3] = 0.4788; TDN[20][4] = 0.4793;
TDN[21][0] = 0.4821; TDN[21][1] = 0.4826; TDN[21][2] = 0.4830; TDN[21][3] = 0.4834; TDN[21][4] = 0.4838;
TDN[22][0] = 0.4861; TDN[22][1] = 0.4864; TDN[22][2] = 0.4868; TDN[22][3] = 0.4871; TDN[22][4] = 0.4875;
TDN[23][0] = 0.4893; TDN[23][1] = 0.4896; TDN[23][2] = 0.4898; TDN[23][3] = 0.4901; TDN[23][4] = 0.4904;
TDN[24][0] = 0.4918; TDN[24][1] = 0.4920; TDN[24][2] = 0.4922; TDN[24][3] = 0.4925; TDN[24][4] = 0.4927;
TDN[20][5] = 0.4798; TDN[20][6] = 0.4803; TDN[20][7] = 0.4808; TDN[20][8] = 0.4812; TDN[20][9] = 0.4817;
TDN[21][5] = 0.4842; TDN[21][6] = 0.4846; TDN[21][7] = 0.4850; TDN[21][8] = 0.4854; TDN[21][9] = 0.4857;
TDN[22][5] = 0.4878; TDN[22][6] = 0.4881; TDN[22][7] = 0.4884; TDN[22][8] = 0.4887; TDN[22][9] = 0.4890;
TDN[23][5] = 0.4906; TDN[23][6] = 0.4909; TDN[23][7] = 0.4911; TDN[23][8] = 0.4913; TDN[23][9] = 0.4916;
TDN[24][5] = 0.4929; TDN[24][6] = 0.4931; TDN[24][7] = 0.4932; TDN[24][8] = 0.4934; TDN[24][9] = 0.4936;
TDN[25][0] = 0.4938; TDN[25][1] = 0.4940; TDN[25][2] = 0.4941; TDN[25][3] = 0.4943; TDN[25][4] = 0.4945;
TDN[26][0] = 0.4953; TDN[26][1] = 0.4955; TDN[26][2] = 0.4956; TDN[26][3] = 0.4957; TDN[26][4] = 0.4959;
TDN[27][0] = 0.4965; TDN[27][1] = 0.4966; TDN[27][2] = 0.4967; TDN[27][3] = 0.4968; TDN[27][4] = 0.4969;
TDN[28][0] = 0.4974; TDN[28][1] = 0.4975; TDN[28][2] = 0.4967; TDN[28][3] = 0.4977; TDN[28][4] = 0.4977;
TDN[29][0] = 0.4981; TDN[29][1] = 0.4982; TDN[29][2] = 0.4982; TDN[29][3] = 0.4983; TDN[29][4] = 0.4984;
TDN[25][5] = 0.4946; TDN[25][6] = 0.4948; TDN[25][7] = 0.4949; TDN[25][8] = 0.4951; TDN[25][9] = 0.4952;
TDN[26][5] = 0.4960; TDN[26][6] = 0.4961; TDN[26][7] = 0.4962; TDN[26][8] = 0.4963; TDN[26][9] = 0.4964;
TDN[27][5] = 0.4970; TDN[27][6] = 0.4971; TDN[27][7] = 0.4972; TDN[27][8] = 0.4973; TDN[27][9] = 0.4974;
TDN[28][5] = 0.4978; TDN[28][6] = 0.4979; TDN[28][7] = 0.4979; TDN[28][8] = 0.4980; TDN[28][9] = 0.4981;
TDN[29][5] = 0.4984; TDN[29][6] = 0.4985; TDN[29][7] = 0.4985; TDN[29][8] = 0.4986; TDN[29][9] = 0.4986;
TDN[30][0] = 0.4987; TDN[30][1] = 0.4987; TDN[30][2] = 0.4987; TDN[30][3] = 0.4988; TDN[30][4] = 0.4988;
TDN[31][0] = 0.4990; TDN[31][1] = 0.4991; TDN[31][2] = 0.4991; TDN[31][3] = 0.4991; TDN[31][4] = 0.4992;
TDN[32][0] = 0.4993; TDN[32][1] = 0.4993; TDN[32][2] = 0.4994; TDN[32][3] = 0.4994; TDN[32][4] = 0.4994;
TDN[33][0] = 0.4995; TDN[33][1] = 0.4995; TDN[33][2] = 0.4995; TDN[33][3] = 0.4996; TDN[33][4] = 0.4996;
TDN[34][0] = 0.4997; TDN[34][1] = 0.4997; TDN[34][2] = 0.4997; TDN[34][3] = 0.4997; TDN[34][4] = 0.4997;
TDN[30][5] = 0.4989; TDN[30][6] = 0.4989; TDN[30][7] = 0.4989; TDN[30][8] = 0.4990; TDN[30][9] = 0.4990;
TDN[31][5] = 0.4992; TDN[31][6] = 0.4992; TDN[31][7] = 0.4992; TDN[31][8] = 0.4993; TDN[31][9] = 0.4993;
TDN[32][5] = 0.4994; TDN[32][6] = 0.4994; TDN[32][7] = 0.4995; TDN[32][8] = 0.4995; TDN[32][9] = 0.4995;
TDN[33][5] = 0.4996; TDN[33][6] = 0.4996; TDN[33][7] = 0.4996; TDN[33][8] = 0.4996; TDN[33][9] = 0.4997;
TDN[34][5] = 0.4997; TDN[34][6] = 0.4997; TDN[34][7] = 0.4997; TDN[34][8] = 0.4997; TDN[34][9] = 0.4998;
TDN[35][0] = 0.4998; TDN[35][1] = 0.4998; TDN[35][2] = 0.4998; TDN[35][3] = 0.4998; TDN[35][4] = 0.4998;
TDN[36][0] = 0.4998; TDN[36][1] = 0.4998; TDN[36][2] = 0.4999; TDN[36][3] = 0.4999; TDN[36][4] = 0.4999;
TDN[37][0] = 0.4999; TDN[37][1] = 0.4999; TDN[37][2] = 0.4999; TDN[37][3] = 0.4999; TDN[37][4] = 0.4999;
TDN[38][0] = 0.4999; TDN[38][1] = 0.4999; TDN[38][2] = 0.4999; TDN[38][3] = 0.4999; TDN[38][4] = 0.4999;
TDN[39][0] = 0.5000; TDN[39][1] = 0.5000; TDN[39][2] = 0.5000; TDN[39][3] = 0.5000; TDN[39][4] = 0.5000;
TDN[35][5] = 0.4998; TDN[35][6] = 0.4998; TDN[35][7] = 0.4998; TDN[35][8] = 0.4998; TDN[35][9] = 0.4998;
TDN[36][5] = 0.4999; TDN[36][6] = 0.4999; TDN[36][7] = 0.4999; TDN[36][8] = 0.4999; TDN[36][9] = 0.4999;
TDN[37][5] = 0.4999; TDN[37][6] = 0.4999; TDN[37][7] = 0.4999; TDN[37][8] = 0.4999; TDN[37][9] = 0.4999;
TDN[38][5] = 0.4999; TDN[38][6] = 0.4999; TDN[38][7] = 0.4999; TDN[38][8] = 0.4999; TDN[38][9] = 0.4999;
TDN[39][5] = 0.5000; TDN[39][6] = 0.5000; TDN[39][7] = 0.5000; TDN[39][8] = 0.5000; TDN[39][9] = 0.5000;

DistNormal(TDN);
}

/*###################################################################################################################################
##                                                  DISTRIBUIÇÃO BINOMINAL                                                      ##
/####################################################################################################################################*/


function DistBinomi() {
    var vetor = []; var AComb = [];
    //NBi tamanho da amostra
    var NBi = parseFloat(document.getElementById("NBinomi").value);
    //KBi elementos
    var KBi = (document.getElementById("KBinomi").value);
    //Qbi fracasso
    var QBi = parseFloat(document.getElementById("QBinomi").value);
    //Pbi Sucesso
    var PBi = parseFloat(document.getElementById("PBinomi").value);

    //tira os ; , e transforma o vetor em numerico
    vetor = KBi.split(";");
        for (let i = 0; i < vetor.length; i++) {
            vetor[i] = parseFloat(vetor[i]);
        }

    //NMK é o tamanho da amostra - o tamanho dos elementos
    var NMK = 0;
    //total final do K
    var Ktotal = 0;
    //valor do fatorial de N
    var FatoriN = 1;
    var i = 1;
    var prob = 0;
    while (i <= NBi) {
        FatoriN = FatoriN * i;
        i++;
    }
    //começa o calculo da probabilidade da Distribuição Binomenal
    for (let i = 0; i < vetor.length; i++) {
        NMK = NBi - vetor[i];

        if (vetor[i] == 0 || vetor[i] == NBi) {
            AComb[i] = 1;
        } else if (vetor[i] == 1) {
            AComb[i] = NBi;
        } else {
            var x = 1;
            FatoriK = 1;
            var y = 1;
            FatoriNMK = 1;
            while (x <= vetor[i]) {
                FatoriK = FatoriK * x;
                x++;
            }
            while (y <= NMK) {
                FatoriNMK = FatoriNMK * y;
                y++;
            }
        AComb[i] = FatoriN/(FatoriK * FatoriNMK);
        } 
        //resultado final já somado caso coloque varios elementos de K
        prob += (AComb[i] * (Math.pow(PBi , vetor[i])) * (Math.pow(QBi , NMK)))*100;
    }
    document.getElementById("saidadbgg").innerHTML = prob.toFixed(2) + '%';
}

/*###################################################################################################################################
##                                                  DISTRIBUIÇÃO UNIFORME                                                      ##
/####################################################################################################################################*/
function distUni() {
    var vmax = parseFloat(document.getElementById("vmax").value);
    var vmin = parseFloat(document.getElementById("vmin").value);
    var inter1 = parseFloat(document.getElementById("nume1").value);
    var inter2 = parseFloat(document.getElementById("nume2").value);

    var media = (vmax + vmin)/2;
    var dp = parseFloat(Math.sqrt(((vmax - vmin) ** 2) / 12).toFixed(2));
    var coeficiente = parseFloat(((dp / media) * 100).toFixed(2));
    var tipuni = document.getElementById('disUniSelect').value;
    var nume = 0;
    //Tratamento das possibilidades
    if (tipuni == 1) { //entre 
        if (inter1 > inter2) {

             nume = inter1 - inter2;

        } else {

            nume = inter2 - inter1;

        }
    }else if (tipuni == 2) {//maior que

         nume = vmax - inter1;

    }else if (tipuni == 3) { //menor que

         nume = inter1 - vmin;

    }else if (tipuni == 4) { //de x até x

        nume = (inter2 - 1) - inter1;

    }
    prob = (((1 / (vmax - vmin)) * nume)*100).toFixed(2);
    document.getElementById('probdu').innerHTML = prob;

    
}



/*###################################################################################################################################
##                                                  Correlação e regressão                                                         ##
/####################################################################################################################################*/

function correlacao() {
    var VXdependente = []; var VYindependente = [];var reta=[]; var pontos=[];
    var Xdep = (document.getElementById("dependente").value);
    var Yindep = (document.getElementById("independente").value);
  
    VXdependente = Xdep.split(";");
    VYindependente = Yindep.split(";");
    var somax = 0;
    for (let i = 0; i < VXdependente.length; i++) {
       VXdependente[i] = parseFloat(VXdependente[i]);
        somax += VXdependente[i];
    } 
    
    
    var somay = 0;
    for (let i = 0; i < VYindependente.length; i++) {
        VYindependente[i] = parseFloat(VYindependente[i]);
        somay += VYindependente[i];
    } 
    //ordena pontos de x e y pro grafico



    //recebe x e y num vetor ja ordenados e no formato correto
    var y1=VYindependente[0];
    var y2=VYindependente[0]
 for (let i = 0; i < VXdependente.length; i++) {
    pontos.push({
        x:VXdependente[i],
        y:VYindependente[i]}); 
        if (y2 < VYindependente[i]) {
            y2 = VYindependente[i];
        }
        if (y1 > VYindependente[i]) {
            y1 = VYindependente[i];
        }

       
 };
   

    
    var xvezesy = 0;
    var xquadrado = 0;
    var yquadrado = 0;
    for (let i = 0; i < VXdependente.length; i++) {

        xvezesy += VXdependente[i] * VYindependente[i] ;
        xquadrado += VXdependente[i] * VXdependente[i];
        yquadrado += VYindependente[i] * VYindependente[i];

    }
    var tamanhovetor = VXdependente.length;
    var R = (((tamanhovetor*xvezesy)-((somax)*(somay)))/Math.sqrt((tamanhovetor*xquadrado-(somax*somax))*(tamanhovetor*yquadrado-(somay*somay)))*100).toFixed(2);

    var A = (((tamanhovetor*xvezesy)-(somax*somay))/(tamanhovetor*xquadrado-(somax*somax))).toFixed(2);
    var Yrisco = (somay / tamanhovetor).toFixed(2);
    var Xrisco = (somax/tamanhovetor).toFixed(2);
    var B = (Yrisco - A * Xrisco).toFixed(2);
   
    reta=[
        {x:(y1-B)/A,  y:y1},
        {x:(y2-B)/A,  y:y2}];

        console.log(reta[0]);
    document.getElementById('corelasaida').innerHTML = R + "%";
    document.getElementById('equacaosaida').innerHTML = "Y = " + A + " * X " + " + " + B;

    var ctx = document.getElementById('myChart2');   

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            type: 'line',
            label: 'X:',
            data: reta,
            fill: false,
            backgroundColor: "rgba(218,83,79, .7)",
            borderColor: "rgba(218,83,79, .7)",
            pointRadius: 0
          }, {
            type: 'bubble',
            label: 'Y:',
            data: pontos,
            backgroundColor: "rgba(76,78,80, .7)",
            borderColor: "transparent",
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }],
           
          }
        }
      });
  
}

function separatrizes(vetor,valorsep,separatriz) {
    if (separatriz == 1) {
        var tamvet = vetor.length - 1;
        posi = tamvet * valorsep / 100
        var res = vetor[Math.round(posi)];        
        document.getElementById('saidaseparatriz').innerHTML = "O valor da Medida Separatriz escolido é de: " + res;
    }
}