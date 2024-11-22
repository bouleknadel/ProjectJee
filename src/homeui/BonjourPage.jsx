import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'; // Import du Dialog
import { Dropdown } from 'primereact/dropdown'; // Import pour le dropdown
import { Calendar } from 'primereact/calendar'; // Ajout de l'import Calendar



const BonjourPage = () => {
  const [sessions, setSessions] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false); // État pour contrôler la visibilité du modal
  const [selectedType, setSelectedType] = useState(null);
  const [dates, setDates] = useState(null); // Ajout de l'état pour les dates
  const [formattedDates, setFormattedDates] = useState(null); // Nouvel état pour les dates formatées
  const [timeSlots, setTimeSlots] = useState([
    { start: '08:00', end: '10:00' },
    { start: '10:00', end: '12:00' },
    { start: '14:00', end: '16:00' },
    { start: '16:00', end: '18:00' }
]);
const handleTimeChange = (index, field, value) => {
  const newTimeSlots = [...timeSlots];
  newTimeSlots[index][field] = value;
  setTimeSlots(newTimeSlots);
};


  
  const sessionTypes = [
    { label: 'Normale Hiver', value: 'NORMALE_HIVER' },
    { label: 'Normale Printemps', value: 'NORMALE_PRINTEMPS' },
    { label: 'Rattrapage Hiver', value: 'RATTRAPAGE_HIVER' },
    { label: 'Rattrapage Printemps', value: 'RATTRAPAGE_PRINTEMPS' }
  ];
  useEffect(() => {
    const data = [
      {
        id: '1',
        typeSession: 'Normale',
        dateDebut: '2024-01-15',
        dateFin: '2024-05-15'
      },
      {
        id: '2',
        typeSession: 'Rattrapage',
        dateDebut: '2024-06-01',
        dateFin: '2024-06-30'
      },
      {
        id: '3',
        typeSession: 'Normale',
        dateDebut: '2024-09-15',
        dateFin: '2024-12-31'
      },
      {
        id: '4',
        typeSession: 'Exceptionnelle',
        dateDebut: '2024-07-01',
        dateFin: '2024-07-30'
      }
    ];

    setSessions(data);
    setLoading(false);
  }, []);

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const dateBodyTemplate = (rowData, field) => {
    return formatDate(rowData[field]);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="p-button-warning"
          onClick={() => handleEdit(rowData)}
          tooltip="Modifier"
          tooltipOptions={{ position: 'top' }}
          style={{ margin: '0 0.1rem' }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => handleDelete(rowData)}
          tooltip="Supprimer"
          tooltipOptions={{ position: 'top' }}
          style={{ margin: '0 0.1rem' }}
        />
      </div>
    );
  };

  const handleEdit = (session) => {
    console.log('Modifier la session:', session);
  };

  const handleDelete = (session) => {
    console.log('Supprimer la session:', session);
  };

  const renderHeader = () => {
    return (
      <div>
        <div className="flex justify-content-between align-items-center" style={{ padding: '0 0.5rem' }}>
          <h2 className="m-0">Session</h2>
        </div>
        <div className="flex align-items-center mt-3" style={{ position: 'relative' }}>
          <span className="p-input-icon-left">
            <i className="pi pi-search" style={{ left: '0.75rem' }} />
            <InputText
              value={globalFilterValue}
              onChange={(e) => setGlobalFilterValue(e.target.value)}
              placeholder="Rechercher..."
              style={{
                paddingLeft: '2.5rem'
              }}
              className="p-inputtext-lg"
            />
          </span>
          <Button
            label="Ajouter une Session"
            icon="pi pi-plus"
            severity="success"
            onClick={() => {
              setSelectedType(null);
              setVisible(true)

            }
            } // Ouvre le modal
            className="p-button-raised"
            style={{
              position: 'absolute',
              right: '0'
            }}
          />
        </div>
      </div>
    );
  };
  const formatDateToString = (date) => {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
  // Footer du modal avec les boutons
  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Annuler"
          icon="pi pi-times"
          onClick={() => setVisible(false)}
          className="p-button-text"
        />
        <Button
          label="Sauvegarder"
          icon="pi pi-check"
          onClick={() => {
          
            console.log('date', formattedDates);
            console.log('Créneaux horaires:', timeSlots);
            setVisible(false);
            setSelectedType(null);
          }}
          autoFocus
          disabled={!selectedType || !dates}
        />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="card" style={{ padding: '20px' }}>
      <DataTable
        value={sessions}
        paginator
        rows={5}
        dataKey="id"
        loading={loading}
        globalFilter={globalFilterValue}
        header={header}
        emptyMessage="Aucune session trouvée."
        rowsPerPageOptions={[5, 10]}
        removableSort
        showGridlines
        stripedRows
        sortMode="multiple"
        globalFilterFields={['id', 'typeSession', 'dateDebut', 'dateFin']}
      >
        <Column
          field="id"
          header="ID"
          sortable
          style={{ minWidth: '5rem' }}
        />
        <Column
          field="typeSession"
          header="Type Session"
          sortable
          style={{ minWidth: '10rem' }}
        />
        <Column
          field="dateDebut"
          header="Date Début"
          sortable
          body={(rowData) => dateBodyTemplate(rowData, 'dateDebut')}
          style={{ minWidth: '10rem' }}
        />
        <Column
          field="dateFin"
          header="Date Fin"
          sortable
          body={(rowData) => dateBodyTemplate(rowData, 'dateFin')}
          style={{ minWidth: '10rem' }}
        />
        <Column
          body={actionBodyTemplate}
          header="Actions"
          style={{ minWidth: '10rem', textAlign: 'center' }}
        />
      </DataTable>
      {/* Modal Dialog */}
      <Dialog
        header="Ajouter une Session"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => {
          setVisible(false);
          setSelectedType(null);
        }}
        footer={renderFooter}
        modal
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',  // Augmentation significative de l'espacement
          padding: '1.5rem 0'  // Ajout de padding vertical
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'  // Espacement entre le label et le dropdown
          }}>
            <label
              htmlFor="session-type"
              style={{
                fontWeight: 'bold',
                fontSize: '1rem',
                marginBottom: '0.5rem'  // Espace supplémentaire après le label
              }}
            >
              Type de Session
            </label>
            <Dropdown
              id="session-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.value)}
              options={sessionTypes}
              placeholder="Sélectionnez un type de session"
              style={{
                width: '100%',
                marginTop: '0.5rem'  // Espace supplémentaire avant le dropdown
              }}
            />
            <label
              htmlFor="session-date"
              style={{
                fontWeight: 'bold',
                fontSize: '1rem',
                marginBottom: '0.5rem'  // Espace supplémentaire après le label
              }}
            >
              Date
              <Calendar 
                style={{
                  width: '100%',
                  marginTop: '0.5rem'  // Espace supplémentaire avant le dropdown
                }}
              value={dates} 
               id="session-date"
              onChange={(e) => {
                setDates(e.value); // Garde les objets Date pour le Calendar
                            if (e.value) {
                                const formatted = Array.isArray(e.value) ? 
                                    e.value.map(date => formatDateToString(date)) : 
                                    formatDateToString(e.value);
                                setFormattedDates(formatted); // Stocke les dates formatées séparément
                                console.log('Dates formatées:', formatted);
                            } else {
                                setFormattedDates(null);
                            }

              }} 
              dateFormat="dd-mm-yy"  // Format de date français
              showTime={false}       // Désactive la sélection de l'heure
              showSeconds={false}    // Désactive l'affichage des secondes
              showIcon 
              selectionMode="range" 
              readOnlyInput 
              placeholder="Sélectionnez les dates de début et fin"
              hideOnRangeSelection />
              <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1rem',
                        marginTop: '1rem'
                    }}>
                        {timeSlots.map((slot, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px'
                            }}>
                                <InputText
                                    type="time"
                                    value={slot.start}
                                    onChange={(e) => handleTimeChange(index, 'start', e.target.value)}
                                    style={{ width: '100px' }}
                                />
                                <span>-</span>
                                <InputText
                                    type="time"
                                    value={slot.end}
                                    onChange={(e) => handleTimeChange(index, 'end', e.target.value)}
                                    style={{ width: '100px' }}
                                />
                            </div>
                        ))}
                    </div>

            </label>
          </div>
        </div>
      </Dialog>
    </div>

  );
};

export default BonjourPage;