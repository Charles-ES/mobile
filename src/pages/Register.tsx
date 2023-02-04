import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import Adresse from "./Adresse";
import "./Register.css";

function Register() {
  const genreUrl = Adresse() + "/genres";
  const inscriptionUrl = Adresse() + "/client/register";
  const [dataGenre, setDataGenre] = useState<any>([]);

  const initgenre = () => {
    return fetch(genreUrl, {
      method: "get",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        setDataGenre(result.data);
      });
  };

  const nom = useRef<HTMLIonInputElement>(null);
  const telephone = useRef<HTMLIonInputElement>(null);
  const idgenre = useRef<HTMLIonSelectElement>(null);
  const motdepasse = useRef<HTMLIonInputElement>(null);

  const inscription = () => {
    return fetch(inscriptionUrl, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        nom: nom.current?.value,
        telephone: telephone.current?.value,
        idgenre: idgenre.current?.value,
        motdepasse: motdepasse.current?.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data != null) {
          presentToast('bottom', result.data.message);
        }
      });
  };


   
  const [present] = useIonToast();
  const presentToast = (position: 'top' | 'middle' | 'bottom', messagevalue:string) => {
    present({
      message: messagevalue,
      duration: 2000,
      position: position
    });
  };

  useEffect(() => {
    initgenre();
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inscription</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => window.location.replace("/client/login") }>
              Se connecter
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol push-sm="6">
                    <IonItem>
                      <IonLabel aria-required={true} position="floating">
                        Nom
                      </IonLabel>
                      <IonInput
                        ref={nom}
                        required={true}
                        type="text"
                        placeholder="Entrer votre nom"
                      ></IonInput>
                    </IonItem>  
                    <IonItem>
                      <IonLabel aria-required={true} position="floating">
                        Telephone
                      </IonLabel>
                      <IonInput
                        ref={telephone}
                        required={true}
                        placeholder="Entrer votre telephone"
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel aria-required={true} position="floating">
                        Genre
                      </IonLabel>
                      <IonSelect
                        ref={idgenre}
                        aria-required={true}
                        interface="popover"
                      >
                        {dataGenre.map((genre: any) => (
                          <IonSelectOption key={genre.id} value={genre.id}>
                            {genre.libelle}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                    
                    <IonItem>
                      <IonLabel aria-required={true} position="floating">
                        Mot de passe
                      </IonLabel>
                      <IonInput
                        ref={motdepasse}
                        required={true}
                        type="password"
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonButton onClick={() => inscription()}>S'inscrire</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </>
  );
}
export default Register;
