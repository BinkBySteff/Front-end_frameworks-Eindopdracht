<template>
  <ion-page>
    <AppHeader title="Kennisbank" />

    <ion-content class="recare-bg">
      <div class="knowledge-wrapper">

        <div class="knowledge-card" @click="openModal('richtlijnen')">
          <div class="card-inner">
            <ion-icon :icon="documentTextOutline" class="card-icon" />
            <div>
              <h3 class="card-title">Richtlijnen inspectie</h3>
              <p class="card-text">Overzicht van standaardprocedures en aandachtspunten tijdens vastgoedinspecties.</p>
            </div>
          </div>
          <span class="card-arrow">›</span>
        </div>

        <div class="knowledge-card" @click="openModal('faq')">
          <div class="card-inner">
            <ion-icon :icon="helpCircleOutline" class="card-icon" />
            <div>
              <h3 class="card-title">Veelgestelde vragen</h3>
              <p class="card-text">Antwoorden op veelvoorkomende vragen van inspecteurs en beheerders.</p>
            </div>
          </div>
          <span class="card-arrow">›</span>
        </div>

        <div class="knowledge-card" @click="openModal('documentatie')">
          <div class="card-inner">
            <ion-icon :icon="folderOpenOutline" class="card-icon" />
            <div>
              <h3 class="card-title">Documentatie</h3>
              <p class="card-text">Handleidingen, checklists en aanvullende documentatie.</p>
            </div>
          </div>
          <span class="card-arrow">›</span>
        </div>

      </div>
    </ion-content>

    <!-- Modal -->
    <ion-modal :is-open="modalOpen" @did-dismiss="closeModal">
      <ion-header>
        <ion-toolbar class="recare-toolbar">
          <ion-title>{{ modalContent.title }}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModal">Sluiten</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="modal-content">
        <div class="modal-body">

          <!-- Richtlijnen -->
          <template v-if="activeModal === 'richtlijnen'">
            <p class="modal-intro">RealEstateCare hanteert vaste procedures voor alle typen inspecties. Onderstaande richtlijnen zijn bindend voor alle inspecteurs.</p>
            <div class="info-block">
              <h4>Algemene werkwijze</h4>
              <p>Bij iedere inspectie dient de inspecteur zich te legitimeren bij de huurder en een overzicht te geven van de te inspecteren onderdelen.</p>
            </div>
            <div class="info-block">
              <h4>Foto-documentatie</h4>
              <p>Van iedere bevinding worden minimaal twee foto's gemaakt vanuit verschillende hoeken. Foto's worden direct gekoppeld aan het rapport.</p>
            </div>
            <div class="info-block">
              <h4>Urgentieclassificatie</h4>
              <p>Bevindingen worden geclassificeerd als acuut, op korte termijn of planmatig onderhoud. Acute gevallen worden dezelfde dag gemeld.</p>
            </div>
            <a class="fake-link" href="#">www.realestatecarerichtlijnen.nl</a>
          </template>

          <!-- FAQ -->
          <template v-else-if="activeModal === 'faq'">
            <p class="modal-intro">Hieronder vindt u antwoorden op de meest gestelde vragen.</p>
            <div class="faq-item">
              <h4>Wat doe ik als een huurder niet opendoet?</h4>
              <p>Noteer dit in het rapport en plan een herbezoek via de beheerder. Neem contact op met kantoor als dit de tweede keer is.</p>
            </div>
            <div class="faq-item">
              <h4>Hoe upload ik foto's als ik geen internet heb?</h4>
              <p>De app slaat foto's lokaal op. Zodra er een verbinding beschikbaar is, worden ze automatisch gesynchroniseerd.</p>
            </div>
            <div class="faq-item">
              <h4>Wie beoordeelt de rapporten na indiening?</h4>
              <p>Rapporten worden binnen 24 uur beoordeeld door de kwaliteitscoördinator van RealEstateCare.</p>
            </div>
            <div class="faq-item">
              <h4>Kan ik een ingediend rapport nog wijzigen?</h4>
              <p>Ja, rapporten kunnen worden aangepast via de "Uitgevoerde rapportages" binnen 48 uur na indiening.</p>
            </div>
            <a class="fake-link" href="#">www.realestatecaresupport.nl/faq</a>
          </template>

          <!-- Documentatie -->
          <template v-else-if="activeModal === 'documentatie'">
            <p class="modal-intro">Alle relevante documenten voor inspecteurs staan hieronder verzameld.</p>
            <div class="doc-item">
              <ion-icon :icon="documentOutline" class="doc-icon" />
              <div>
                <p class="doc-name">Inspectiehandleiding 2026</p>
                <a class="fake-link small" href="#">Downloaden (PDF)</a>
              </div>
            </div>
            <div class="doc-item">
              <ion-icon :icon="documentOutline" class="doc-icon" />
              <div>
                <p class="doc-name">Checklist schadeopname</p>
                <a class="fake-link small" href="#">Downloaden (PDF)</a>
              </div>
            </div>
            <div class="doc-item">
              <ion-icon :icon="documentOutline" class="doc-icon" />
              <div>
                <p class="doc-name">Testprocedure technische installaties</p>
                <a class="fake-link small" href="#">Downloaden (PDF)</a>
              </div>
            </div>
            <div class="doc-item">
              <ion-icon :icon="documentOutline" class="doc-icon" />
              <div>
                <p class="doc-name">Normblad modificaties huurders</p>
                <a class="fake-link small" href="#">Downloaden (PDF)</a>
              </div>
            </div>
            <a class="fake-link" href="#">www.realestatecaredocs.nl</a>
          </template>

        </div>
      </ion-content>
    </ion-modal>

  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  IonPage, IonContent, IonModal, IonHeader, IonToolbar,
  IonTitle, IonButtons, IonButton, IonIcon,
} from '@ionic/vue'
import { documentTextOutline, helpCircleOutline, folderOpenOutline, documentOutline } from 'ionicons/icons'
import AppHeader from '@/components/AppHeader.vue'

type ModalType = 'richtlijnen' | 'faq' | 'documentatie' | null

const modalOpen = ref(false)
const activeModal = ref<ModalType>(null)

const modalContent = computed(() => {
  const map = {
    richtlijnen: { title: 'Richtlijnen inspectie' },
    faq: { title: 'Veelgestelde vragen' },
    documentatie: { title: 'Documentatie' },
  }
  return activeModal.value ? map[activeModal.value] : { title: '' }
})

function openModal(type: ModalType) {
  activeModal.value = type
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  activeModal.value = null
}
</script>

<style scoped>
.knowledge-wrapper {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.knowledge-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 14px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-left: 4px solid rgb(0, 170, 162);
  box-shadow:
    0 8px 20px rgba(20, 27, 31, 0.08),
    0 2px 6px rgba(20, 27, 31, 0.05);
  transition: transform 120ms ease;
}

.knowledge-card:active {
  transform: scale(0.98);
}

.card-inner {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex: 1;
}

.card-icon {
  font-size: 26px;
  color: rgb(0, 170, 162);
  flex-shrink: 0;
  margin-top: 2px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: rgb(20, 27, 31);
}

.card-text {
  margin: 0;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.6);
}

.card-arrow {
  font-size: 22px;
  color: rgba(20, 27, 31, 0.3);
  margin-left: 8px;
  flex-shrink: 0;
}

/* Modal */
.modal-content {
  --background: #f5f5f5;
}

.modal-body {
  padding: 20px 16px;
}

.modal-intro {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: rgba(20, 27, 31, 0.7);
  line-height: 1.5;
}

.info-block, .faq-item {
  background: #ffffff;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(20, 27, 31, 0.06);
}

.info-block h4, .faq-item h4 {
  margin: 0 0 6px 0;
  font-size: 14px;
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.info-block p, .faq-item p {
  margin: 0;
  font-size: 13px;
  color: rgba(20, 27, 31, 0.7);
  line-height: 1.5;
}

.doc-item {
  background: #ffffff;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(20, 27, 31, 0.06);
}

.doc-icon {
  font-size: 24px;
  color: rgb(0, 170, 162);
  flex-shrink: 0;
}

.doc-name {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: rgb(20, 27, 31);
}

.fake-link {
  display: inline-block;
  margin-top: 16px;
  font-size: 13px;
  color: rgb(0, 170, 162);
  text-decoration: underline;
  cursor: pointer;
}

.fake-link.small {
  margin-top: 0;
  font-size: 12px;
}
</style>