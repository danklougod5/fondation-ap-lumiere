# Fondation AP Lumiere

Projet de site web pour la fondation.

## Déploiement sur Render

Ce projet est configuré pour être déployé sur **Render** en tant que **Static Site**.

### Étapes pour le déploiement :

1. **Pousser les modifications sur GitHub** :
   ```bash
   git add .
   git commit -m "Prépare le déploiement sur Render"
   git push origin dody-dev
   ```

2. **Configurer Render** :
   - Connectez-vous à [Render](https://dashboard.render.com).
   - Cliquez sur **New +** puis sélectionnez **Blueprint**.
   - Connectez votre dépôt GitHub.
   - Render détectera automatiquement le fichier `render.yaml`.
   - Cliquez sur **Apply**.

3. **Variables d'environnement** :
   Lors de la création, ou après dans les paramètres du service, vous devrez ajouter les variables suivantes :
   - `VITE_SUPABASE_URL` : L'URL de votre projet Supabase.
   - `VITE_SUPABASE_ANON_KEY` : La clé anonyme de votre projet Supabase.

### Configuration technique
- **Build Command** : `npm install && npm run build`
- **Publish Directory** : `dist`
- **Node Version** : 20 (défini dans `.node-version`)
- **SPA Routing** : Toutes les routes sont redirigées vers `index.html` pour supporter le routage React Router.
