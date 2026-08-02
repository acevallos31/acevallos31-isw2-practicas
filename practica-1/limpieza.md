Codigo Viejo

void guardarT5(int botin)
{
    vector<int> P;

    // Abrimos el archivo
    ifstream t5("t5.txt");

    int plata;

    // Leemos los datos
    while (t5 >> plata)
    {
        P.push_back(plata);
    }

    // Cerramos el archivo
    t5.close();

    // Agregamos el nuevo dato
    P.push_back(botin);

    // Ordenamos
    sort(P.begin(), P.end(), greater<int>());

    // Revisamos cuantos hay
    if (P.size() > 5)
    {
        // Dejamos cinco
        P.resize(5);
    }
    else
    {
        // No hacemos nada
    }

    // Abrimos otra vez el archivo
    ofstream t5a("t5.txt");

    // Guardamos los datos
    if (t5a.is_open())
    {
        for (int rata = 0; rata < P.size(); rata++)
        {
            t5a << P[rata] << endl;
        }
    }
    else
    {
        // Si falla no hacemos nada
    }

    // Cerramos
    t5a.close();
}

void mostrarT5()
{
    // Abrimos el archivo
    ifstream t5("t5.txt");

    vector<int> P;

    int plata;

    // Leemos
    while (t5 >> plata)
    {
        P.push_back(plata);
    }

    // Cerramos
    t5.close();

    string robo = "TOP 5:\n";

    // Revisamos si hay datos
    if (P.size() > 0)
    {
        for (int capo = 0; capo < P.size(); capo++)
        {
            robo += to_string(capo + 1) + ". " + to_string(P[capo]) + " pts\n";
        }
    }
    else
    {
        // Si no hay datos no hacemos nada
    }

    // Mostramos
    Mensaje(robo);
}


Refactorizacion

void guardarTop5(int puntos){

    vector<int> puntajes;
    ifstream archivo("top5.txt");

    int p;
    while(archivo >> p){
        puntajes.push_back(p);
    }
    archivo.close();

    puntajes.push_back(puntos);

    sort(puntajes.begin(), puntajes.end(), greater<int>());

    if(puntajes.size() > 5){
        puntajes.resize(5);
    }

    ofstream salida("top5.txt");
    for(int i = 0; i < puntajes.size(); i++){
        salida << puntajes[i] << endl;
    }
    salida.close();
}

void mostrarTop5(){

    ifstream archivo("top5.txt");
    vector<int> puntajes;

    int p;
    while(archivo >> p){
        puntajes.push_back(p);
    }
    archivo.close();

    string top = "TOP 5:\n";

    for(int i = 0; i < puntajes.size(); i++){
        top += to_string(i+1) + ". " + to_string(puntajes[i]) + " pts\n";
    }

    Mensaje(top);
}

