import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import {
  getDepartements,
  addDepartement,
  updateDepartement,
  deleteDepartement,
} from '../services/departementService';
import './DepartementList.css';

const DepartementList = () => {
  const navigate = useNavigate();
  const [departements, setDepartements] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentDepartement, setCurrentDepartement] = useState({
    nom: '',
  });

  useEffect(() => {
    loadDepartements();
  }, []);

  const loadDepartements = () => {
    setLoading(true);
    getDepartements()
      .then((response) => {
        setDepartements(response);
      })
      .catch((error) => console.error('Error fetching departements:', error))
      .finally(() => setLoading(false));
  };

  const handleOpenModal = (mode, departement = null) => {
    setModalMode(mode);
    setCurrentDepartement(departement || { nom: '' });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentDepartement({ nom: '' });
  };

  const handleSubmit = () => {
    if (!currentDepartement.nom) {
      console.error('Le nom du département est manquant');
      return;
    }

    const action = modalMode === 'add' ? addDepartement : updateDepartement;
    const actionArg =
      modalMode === 'add'
        ? currentDepartement
        : [currentDepartement.id, currentDepartement];

    action(actionArg)
      .then(() => {
        loadDepartements();
        handleCloseModal();
      })
      .catch((error) =>
        console.error(`Error ${modalMode}ing departement`, error)
      );
  };

  const handleDelete = (id) => {
    deleteDepartement(id)
      .then(() => {
        loadDepartements();
      })
      .catch((error) => console.error('Error deleting departement:', error));
  };

  const goToEnseignants = (departementId) => {
    navigate(`/departements/${departementId}/enseignants`);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Button
          icon="pi pi-users"
          rounded
          outlined
          className="p-button-success"
          onClick={() => goToEnseignants(rowData.id)}
          tooltip="Voir les enseignants"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="p-button-warning"
          onClick={() => handleOpenModal('edit', rowData)}
          tooltip="Modifier"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Supprimer"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div>
        <div
          className="flex justify-content-between align-items-center"
          style={{ padding: '0 0.5rem' }}
        >
          <h2 className="m-0">Liste des Départements</h2>
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
            label="Ajouter un Département"
            icon="pi pi-plus"
            severity="success"
            className="p-button-raised flex align-items-center gap-2"
            style={{ position: 'absolute', right: '0' }}
            onClick={() => handleOpenModal('add')}
          >
            <i className="pi pi-building ml-2" />
          </Button>
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
        value={departements}
        paginator
        rows={5}
        dataKey="id"
        loading={loading}
        globalFilter={globalFilterValue}
        header={renderHeader()}
        emptyMessage="Aucun département trouvé."
        rowsPerPageOptions={[5, 10, 25]}
        removableSort
        showGridlines
        stripedRows
        sortMode="multiple"
        globalFilterFields={['id', 'nom']}
      >
        <Column
          field="nom"
          header="Nom"
          sortable
          style={{ minWidth: '15rem' }}
        />
        <Column
          body={actionBodyTemplate}
          header="Actions"
          style={{ minWidth: '10rem', textAlign: 'center' }}
        />
      </DataTable>

      <Dialog
        visible={openModal}
        style={{ width: '450px' }}
        header={
          <div className="flex align-items-center gap-3">
            <i className="pi pi-building text-primary text-3xl" />
            <span className="text-2xl font-bold">
              {modalMode === 'add'
                ? 'Ajouter un département'
                : 'Modifier le département'}
            </span>
          </div>
        }
        modal
        className="p-fluid"
        footer={footer}
        onHide={handleCloseModal}
      >
        <div className="grid p-4">
          <div className="col-12" style={{ marginBottom: '2rem' }}>
            <label className="flex align-items-center gap-3 mb-4">
              <span className="text-xl font-bold">Nom du Département</span>
            </label>
            <div className="p-inputgroup" style={{ marginTop: '0.6rem' }}>
              <span className="p-inputgroup-addon">
                <i className="pi pi-building text-primary text-lg" />
              </span>
              <InputText
                value={currentDepartement.nom}
                onChange={(e) =>
                  setCurrentDepartement({
                    ...currentDepartement,
                    nom: e.target.value,
                  })
                }
                className="p-inputtext-lg"
                placeholder="Entrez le nom du département"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DepartementList;
