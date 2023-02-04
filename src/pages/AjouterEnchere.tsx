import React, { useState, useEffect, useRef } from "react";
import "./AjouterEnchere.css";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import Menu from "./Menu";
import Adresse from "./Adresse";
import { TakePhoto } from "../hooks/usePhotoGallery";

// Call the element loader after the app has been rendered the first time

function AjouterEnchere() {
  const categorieUrl = Adresse() + "/categories";
  const getTokenUrl = Adresse() + "/token/" + localStorage.getItem("value");
  const [dataCategorie, setDataCategorie] = useState<any>([]);

  const initCategorie = () => {
    return fetch(categorieUrl, {
      method: "get",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        setDataCategorie(result.data);
      });
  };

  const getToken = () => {
    return fetch(getTokenUrl, {
      method: "get",
      headers: { "Content-type": "application/json" }
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.error != null || result.data == null) {
          localStorage.removeItem('value');
          window.location.replace("/");
        }
      });
  };

  const ajouterEchereUrl = Adresse() + "/enchere/ajouter";
  const ajouterEnchere = () => {
    return fetch(ajouterEchereUrl, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        nomproduit: nomProduit.current?.value,
        token: localStorage.getItem("value"),
        dateheuredebut: dateHeureDebut.current?.value,
        dateheurefin: dateHeureFin.current?.value,
        idcategorie: idcategorie.current?.value,
        base64image: photo.map((p) => p?.data),
        prixdepart: prixDepart.current?.value,
        description: description.current?.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.data != null) {
          presentToast("bottom", result.data.message);
        }
      });
  };

  const [present] = useIonToast();
  const presentToast = (
    position: "top" | "middle" | "bottom",
    messagevalue: string
  ) => {
    present({
      message: messagevalue,
      duration: 2000,
      position: position,
    });
  };

  const idcategorie = useRef<HTMLIonSelectElement>(null);
  const nomProduit = useRef<HTMLIonInputElement>(null);
  const dateHeureDebut = useRef<HTMLIonInputElement>(null);
  const dateHeureFin = useRef<HTMLIonInputElement>(null);
  const prixDepart = useRef<HTMLIonInputElement>(null);
  const description = useRef<HTMLIonTextareaElement>(null);

  const { photo, takePhoto } = TakePhoto();

  useEffect(() => {
    if (localStorage.getItem("value") == null) {
      window.location.replace("/");
    }
    else {
      getToken();
    }
    initCategorie();
  }, []);

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Ajouter Enchere</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonLabel aria-required={true} position="floating">
                  Nom du produit
                </IonLabel>
                <IonInput
                  ref={nomProduit}
                  required={true}
                  placeholder="Entrer le produit"
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel aria-required={true} position="floating">
                  Prix de départ
                </IonLabel>
                <IonInput
                  type="number"
                  ref={prixDepart}
                  required={true}
                  placeholder="Entrer le prix de depart"
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel aria-required={true} position="floating">
                  Description
                </IonLabel>
                <IonTextarea
                required={true}
                ref={description}
                  placeholder="Type something here"
                  autoGrow={true}
                ></IonTextarea>
              </IonItem>

              <IonItem>
                <IonLabel aria-required={true} position="floating">
                  Categorie
                </IonLabel>
                <IonSelect
                  ref={idcategorie}
                  aria-required={true}
                  interface="popover"
                >
                  {dataCategorie.map((categorie: any) => (
                    <IonSelectOption key={categorie.id} value={categorie.id}>
                      {categorie.typeCate}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel aria-required={true} position="floating">
                  Date début
                </IonLabel>
                <br />
                <IonInput
                  required={true}
                  type={"datetime-local"}
                  ref={dateHeureDebut}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel aria-required={true} position="floating">
                  Date fin
                </IonLabel>
                <br />
                <IonInput
                  required={true}
                  type={"datetime-local"}
                  ref={dateHeureFin}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonGrid>
                  <IonRow>
                    {photo.map((p, index) => (
                      <IonCol size="6" key={index}>
                        <IonImg src={p.data} />
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
                {/* <IonThumbnail slot="start">
                  {photo.map((p, index) => (
                    <IonCol>
                      <IonImg key={index} src={p?.data} />
                    </IonCol>
                  ))}
                </IonThumbnail> */}
                <IonButton onClick={() => takePhoto()}>
                  <IonIcon icon={camera} />
                </IonButton>
              </IonItem>

              <IonButton onClick={() => ajouterEnchere()}>Ajouter</IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
}

export default AjouterEnchere;
