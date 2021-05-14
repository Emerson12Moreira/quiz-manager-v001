import { Pergunta } from './../interfaces/pergunta';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Teste } from '../interfaces/teste';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  testes: Teste[];
  mPerguntas: Pergunta[];
  tIndex: number;
  cIndex: number;
  selectedPergunta: Pergunta;
  constructor(private db: AngularFirestore) {
   }

   getData(owner: string): void {
     // get real-time document
    /* this.db.collection('testes').doc('1001').valueChanges().subscribe((d: Teste) => {
    this.data = d;
    }); */

    this.db.collection('testes').doc(owner).collection('meusTestes').valueChanges().subscribe((data: Teste[]) => {
      this.testes = data;
    });
   }

   getPerguntas(owner: string): void {
    this.db.collection('testes').doc(owner).collection('minhasPerguntas').valueChanges().subscribe((perguntas: Pergunta[]) => {
      this.mPerguntas = perguntas;
    });
   }

   setTeste(index: number): void {
     // get static document
    /* this.db.collection('testes').doc(id).get().subscribe(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        const t = doc.data() as Teste;
        this.teste = t;
        this.cIndex = 0;
      }
    }); */
    this.cIndex = index;
  }

   saveUpdateTeste(owner: string, newData: Teste, ref: string): void {
     /* this.db.collection('testes').doc(ref).set(newData); */
     this.db.collection('testes').doc(owner).collection('meusTestes').doc(newData.name).set(newData).then(r => {
       if (this.tIndex) {
         this.testes[this.tIndex].selected = true;
       } else {
         this.tIndex = this.testes.length - 1;
         this.testes[this.tIndex].selected = true;
       }
     });
   }

   saveUpdatePergunta(owner: string, pergunta: Pergunta): void {
    this.db.collection('testes').doc(owner).collection('minhasPerguntas').doc(pergunta._id).set(pergunta);
   }


   deleteTeste(owner: string, name: string): void {
    this.db.collection('testes').doc(owner).collection('meusTestes').doc(name).delete().then(() => {
      this.tIndex = undefined;
    });
   }

   deletePergunta(owner: string, id: string): void {
    this.db.collection('testes').doc(owner).collection('minhasPerguntas').doc(id).delete();
   }
}
