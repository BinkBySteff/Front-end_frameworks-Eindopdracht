<template>
  <ion-page>
    <AppHeader title="Informatie" />

    <ion-content class="recare-bg">
      <div class="info-wrapper">

        <!-- Logo en naam -->
        <div class="info-hero">
          <img src="/src/assets/Logo-Dashboard.png" alt="RealEstateCare logo" class="hero-logo" />
          <h2 class="hero-title">RealEstateCare</h2>
          <p class="hero-sub">Inspectie-applicatie voor professionals</p>
        </div>

        <!-- Over de app -->
        <div class="info-card">
          <div class="info-card-header">
            <ion-icon :icon="informationCircleOutline" class="info-icon" />
            <h3 class="card-title">Over de applicatie</h3>
          </div>
          <p>
            RealEstateCare is een mobiele webapplicatie waarmee inspecteurs op locatie inspecties
            kunnen uitvoeren, schade en onderhoud kunnen registreren en rapportages digitaal kunnen
            indienen. De app vervangt het gebruik van papieren formulieren.
          </p>
        </div>

        <!-- Contactgegevens -->
        <div class="info-card">
          <div class="info-card-header">
            <ion-icon :icon="callOutline" class="info-icon" />
            <h3 class="card-title">Contact</h3>
          </div>
          <div class="contact-row">
            <span class="contact-label">Website</span>
            <a class="fake-link" href="#">www.realestatecare.nl</a>
          </div>
          <div class="contact-row">
            <span class="contact-label">E-mail</span>
            <a class="fake-link" href="#">info@realestatecare.nl</a>
          </div>
          <div class="contact-row">
            <span class="contact-label">Telefoon</span>
            <span class="contact-value">+31 (0)76 123 45 67</span>
          </div>
          <div class="contact-row">
            <span class="contact-label">Support</span>
            <a class="fake-link" href="#">support@realestatecare.nl</a>
          </div>
        </div>

        <!-- Versie-info -->
        <div class="info-card">
          <div class="info-card-header">
            <ion-icon :icon="codeSlashOutline" class="info-icon" />
            <h3 class="card-title">Technische informatie</h3>
          </div>
          <div class="contact-row">
            <span class="contact-label">Versie</span>
            <span class="contact-value">1.0.0 (prototype)</span>
          </div>
          <div class="contact-row">
            <span class="contact-label">Framework</span>
            <span class="contact-value">Vue.js + Ionic</span>
          </div>
          <div class="contact-row">
            <span class="contact-label">Ontwikkeld door</span>
            <span class="contact-value">Steffen Aerts</span>
          </div>
          <div class="contact-row">
            <span class="contact-label">Inzendcode</span>
            <span class="contact-value">32411SA1 — LOI</span>
          </div>
        </div>

        <!-- Licentie -->
        <p class="footer-text">© 2026 RealEstateCare. Alle rechten voorbehouden.</p>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { informationCircleOutline, callOutline, codeSlashOutline } from 'ionicons/icons'
import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
.info-wrapper {
  padding: 24px 16px 32px 16px;
}

/* Hero */
.info-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.hero-logo {
  width: 72px;
  height: 72px;
  object-fit: contain;
  margin-bottom: 12px;
}

.hero-title {
  margin: 0 0 4px 0;
  font-size: 22px;
  font-weight: 700;
  color: rgb(20, 27, 31);
}

.hero-sub {
  margin: 0;
  font-size: 14px;
  color: rgba(20, 27, 31, 0.55);
}

/* Kaarten */
.info-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 18px;
  margin-bottom: 14px;
  box-shadow:
    0 8px 20px rgba(20, 27, 31, 0.08),
    0 2px 6px rgba(20, 27, 31, 0.05);
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.info-icon {
  font-size: 20px;
  color: rgb(0, 170, 162);
  flex-shrink: 0;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  color: rgb(20, 27, 31);
}

.info-card p {
  margin: 0;
  color: rgba(20, 27, 31, 0.7);
  font-size: 14px;
  line-height: 1.6;
}

/* Contactrijen */
.contact-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  gap: 12px;
}

.contact-label {
  font-size: 12px;
  color: rgba(20, 27, 31, 0.55);
  flex-shrink: 0;
}

.contact-value {
  font-size: 13px;
  color: rgb(20, 27, 31);
  font-weight: 500;
  text-align: right;
}

.fake-link {
  font-size: 13px;
  color: rgb(0, 170, 162);
  text-decoration: underline;
  text-align: right;
}

.footer-text {
  margin: 8px 0 0 0;
  text-align: center;
  font-size: 12px;
  color: rgba(20, 27, 31, 0.4);
}
</style>