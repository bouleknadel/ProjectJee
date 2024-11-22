import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import {
  getEnseignants,
  deleteEnseignant,
  updateEnseignant,
  addEnseignant,
} from '../services/enseignantsService';
import './EnseignantList.css';  // Ajoutez cette ligne

const EnseignantList = () => {
  const [enseignants, setEnseignants] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentEnseignant, setCurrentEnseignant] = useState({
    nom: '',
    prenom: '',
    email: '',
    estDispense: false,
    nbSurveillances: 0,
    estReserviste: false,
  });

  useEffect(() => {
    loadEnseignants();
  }, []);

  const loadEnseignants = () => {
    setLoading(true);
    getEnseignants()
      .then((response) => {
        setEnseignants(response);
      })
      .catch((error) => console.error('Error fetching enseignants', error))
      .finally(() => setLoading(false));
  };

  const handleOpenModal = (mode, enseignant = null) => {
    setModalMode(mode);
    setCurrentEnseignant(
      enseignant || {
        nom: '',
        prenom: '',
        email: '',
        estDispense: false,
        nbSurveillances: 0,
        estReserviste: false,
      }
    );
    setOpenModal(true);
  };

 const handleCloseModal = () => {
   setOpenModal(false);
   setCurrentEnseignant({
     nom: '',
     prenom: '',
     email: '',
     estDispense: false,
     nbSurveillances: 0,
     estReserviste: false,
   });
 };


  const handleSubmit = () => {
    if (
      !currentEnseignant ||
      !currentEnseignant.nom ||
      !currentEnseignant.prenom ||
      !currentEnseignant.email
    ) {
      console.error('Informations manquantes');
      return;
    }

    if (modalMode === 'add') {
      addEnseignant(currentEnseignant)
        .then(() => {
          loadEnseignants();
          handleCloseModal();
        })
        .catch((error) => console.error('Error adding enseignant', error));
    } else {
      updateEnseignant(currentEnseignant.id, { ...currentEnseignant })
        .then(() => {
          loadEnseignants();
          handleCloseModal();
        })
        .catch((error) => console.error('Error updating enseignant', error));
    }
  };





  const handleDelete = (id) => {
    deleteEnseignant(id)
      .then(() => {
        loadEnseignants();
      })
      .catch((error) => console.error('Error deleting enseignant', error));
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="p-button-warning"
          onClick={() => handleOpenModal('edit', rowData)}
          tooltip="Modifier"
          tooltipOptions={{ position: 'top' }}
          style={{ margin: '0 0.1rem' }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Supprimer"
          tooltipOptions={{ position: 'top' }}
          style={{ margin: '0 0.1rem' }}
        />
      </div>
    );
  };

  const booleanBodyTemplate = (rowData, field) => {
    return rowData[field] ? 'Oui' : 'Non';
  };

  const renderHeader = () => {
    return (
      <div>
        <div
          className="flex justify-content-between align-items-center"
          style={{ padding: '0 0.5rem' }}
        >
          <h2 className="m-0">Liste des Enseignants</h2>
        </div>
        <div
          className="flex align-items-center mt-3"
          style={{ position: 'relative' }}
        >
          <span className="p-input-icon-left">
            <i className="pi pi-search" style={{ left: '0.75rem' }} />
            <InputText
              value={globalFilterValue}
              onChange={(e) => setGlobalFilterValue(e.target.value)}
              placeholder="Rechercher..."
              style={{ paddingLeft: '2.5rem' }}
              className="p-inputtext-lg"
            />
          </span>
          <Button
            label="Ajouter un Enseignant"
            icon="pi pi-plus"
            severity="success"
            className="p-button-raised"
            style={{ position: 'absolute', right: '0' }}
            onClick={() => handleOpenModal('add')}
          />
        </div>
      </div>
    );
  };

  const footer = (
    <div>
      <Button
        label="Annuler"
        icon="pi pi-times"
        onClick={handleCloseModal}
        className="p-button-text"
      />
      <Button
        label={modalMode === 'add' ? 'Ajouter' : 'Modifier'}
        icon="pi pi-check"
        onClick={handleSubmit}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card" style={{ padding: '20px' }}>
      <DataTable
        value={enseignants}
        paginator
        rows={5}
        dataKey="id"
        loading={loading}
        globalFilter={globalFilterValue}
        header={renderHeader()}
        emptyMessage="Aucun enseignant trouvé."
        rowsPerPageOptions={[5, 10, 25]}
        removableSort
        showGridlines
        stripedRows
        sortMode="multiple"
        globalFilterFields={['id', 'nom', 'prenom', 'email']}
      >
        <Column field="id" header="ID" sortable style={{ minWidth: '5rem' }} />
        <Column
          field="nom"
          header="Nom"
          sortable
          style={{ minWidth: '10rem' }}
        />
        <Column
          field="prenom"
          header="Prénom"
          sortable
          style={{ minWidth: '10rem' }}
        />
        <Column
          field="email"
          header="Email"
          sortable
          style={{ minWidth: '15rem' }}
        />
        <Column
          field="estDispense"
          header="Dispense"
          sortable
          style={{ minWidth: '8rem' }}
          body={(rowData) => booleanBodyTemplate(rowData, 'estDispense')}
        />
        <Column
          field="nbSurveillances"
          header="Nb Surveillances"
          sortable
          style={{ minWidth: '10rem' }}
        />
        <Column
          field="estReserviste"
          header="Reserviste"
          sortable
          style={{ minWidth: '8rem' }}
          body={(rowData) => booleanBodyTemplate(rowData, 'estReserviste')}
        />
        <Column
          body={actionBodyTemplate}
          header="Actions"
          style={{ minWidth: '10rem', textAlign: 'center' }}
        />
      </DataTable>

      <Dialog
        visible={openModal}
        style={{ width: '550px' }}
        header={
          <div className="flex align-items-center gap-3">
            <i
              className="pi pi-user text-primary text-3xl"
              style={{ fontSize: '20px' }}
            />
            <span
              className="text-2xl font-bold"
              style={{ marginLeft: '0.8rem' }}
            >
              {modalMode === 'add'
                ? 'Ajouter un enseignant'
                : "Modifier l'enseignant"}
            </span>
          </div>
        }
        modal
        className="p-fluid"
        footer={footer}
        onHide={handleCloseModal}
      >
        <div className="grid p-4">
          {/* Nom */}
          <div className="col-12 mb-8">
            <label className="flex align-items-center gap-3 mb-4">
              <span className="text-xl font-bold">Nom</span>
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user text-primary text-lg" />
              </span>
              <InputText
                value={currentEnseignant.nom}
                onChange={(e) =>
                  setCurrentEnseignant({
                    ...currentEnseignant,
                    nom: e.target.value,
                  })
                }
                className="p-inputtext-lg"
              />
            </div>
          </div>

          {/* Prénom */}
          <div className="col-12 mb-8">
            <label className="flex align-items-center gap-3 mb-4">
              <span className="text-xl font-bold">Prénom</span>
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user text-primary text-lg" />
              </span>
              <InputText
                value={currentEnseignant.prenom}
                onChange={(e) =>
                  setCurrentEnseignant({
                    ...currentEnseignant,
                    prenom: e.target.value,
                  })
                }
                className="p-inputtext-lg"
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-12 mb-8">
            <label className="flex align-items-center gap-3 mb-4">
              <span className="text-xl font-bold">Email</span>
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope text-primary text-lg" />
              </span>
              <InputText
                value={currentEnseignant.email}
                onChange={(e) =>
                  setCurrentEnseignant({
                    ...currentEnseignant,
                    email: e.target.value,
                  })
                }
                className="p-inputtext-lg"
              />
            </div>
          </div>

          {/* Nb Surveillances */}
          <div className="col-12 mb-8">
            <label className="flex align-items-center gap-3 mb-4">
              <span className="text-xl font-bold">Nb Surveillances</span>
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-users text-primary text-lg" />
              </span>
              <InputNumber
                value={currentEnseignant.nbSurveillances}
                onValueChange={(e) =>
                  setCurrentEnseignant({
                    ...currentEnseignant,
                    nbSurveillances: e.value,
                  })
                }
                className="p-inputnumber-lg"
                showButtons
                min={0}
              />
            </div>
          </div>

          {/* Est dispensé */}
          <div className="col-12 mb-8">
            <label className="flex align-items-center gap-3 mb-4">
              <span className="text-xl font-bold">Dispensé</span>
            </label>
            <div
              className="flex align-items-center gap-3 p-3 border-1 border-round"
              style={{ marginTop: '0.6rem' }}
            >
              <Checkbox
                checked={currentEnseignant.estDispense}
                onChange={(e) =>
                  setCurrentEnseignant({
                    ...currentEnseignant,
                    estDispense: e.checked,
                  })
                }
              />
              <span className="text-lg">
                {currentEnseignant.estDispense ? 'Oui' : 'Non'}
              </span>
            </div>
          </div>

          {/* Est réserviste */}
          <div className="col-12">
            <label className="flex align-items-center gap-3 mb-4">
              <span className="text-xl font-bold">Réserviste</span>
            </label>
            <div
              className="flex align-items-center gap-3 p-3 border-1 border-round"
              style={{ marginTop: '0.6rem' }}
            >
              <Checkbox
                checked={currentEnseignant.estReserviste}
                onChange={(e) =>
                  setCurrentEnseignant({
                    ...currentEnseignant,
                    estReserviste: e.checked,
                  })
                }
              />
              <span className="text-lg">
                {currentEnseignant.estReserviste ? 'Oui' : 'Non'}
              </span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EnseignantList;
