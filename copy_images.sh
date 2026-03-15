#!/bin/bash
BRAIN_DIR="/Users/deepansadhukhan/.gemini/antigravity/brain/16689ee1-6926-4c5b-bbd8-d1b8fe1f6023"
PROJ_DIR="public/images/projects"
EVT_DIR="public/images/events"

# Copy Projects
cp $BRAIN_DIR/proj_ai_healthcare_*.png $PROJ_DIR/ai-healthcare-diagnosis.png
cp $BRAIN_DIR/proj_smart_city_*.png $PROJ_DIR/smart-city-traffic.png
cp $BRAIN_DIR/proj_nlp_languages_*.png $PROJ_DIR/nlp-indian-languages.png
cp $BRAIN_DIR/proj_agriculture_*.png $PROJ_DIR/precision-agriculture-drone.png
cp $BRAIN_DIR/proj_quantum_ml_*.png $PROJ_DIR/quantum-ml-drug-discovery.png
cp $BRAIN_DIR/proj_federated_*.png $PROJ_DIR/federated-learning-healthcare.png
cp $BRAIN_DIR/proj_climate_*.png $PROJ_DIR/ai-climate-prediction.png
cp $BRAIN_DIR/proj_blockchain_*.png $PROJ_DIR/blockchain-supply-chain.png
cp $BRAIN_DIR/proj_xai_finance_*.png $PROJ_DIR/explainable-ai-finance.png

# Copy Events
cp $BRAIN_DIR/evt_ds_conference_*.png $EVT_DIR/data-science-ai-conference.png
cp $BRAIN_DIR/evt_ml_healthcare_*.png $EVT_DIR/ml-healthcare-workshop.png
cp $BRAIN_DIR/evt_nlp_seminar_*.png $EVT_DIR/nlp-seminar-series.png
cp $BRAIN_DIR/evt_ai_ethics_*.png $EVT_DIR/ai-ethics-webinar.png
cp $BRAIN_DIR/evt_student_symposium_*.png $EVT_DIR/student-research-symposium.png
cp $BRAIN_DIR/evt_big_data_*.png $EVT_DIR/big-data-workshop.png
cp $BRAIN_DIR/evt_quantum_ai_*.png $EVT_DIR/quantum-computing-ai-workshop.png
cp $BRAIN_DIR/evt_climate_seminar_*.png $EVT_DIR/ai-climate-seminar.png

echo "Done copying 17 images."
