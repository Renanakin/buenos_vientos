import { useState } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list');

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="admin-logo">Buenos Vientos <span>Admin</span></div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeTab === 'list' ? 'active' : ''} 
              onClick={() => setActiveTab('list')}
            >
              <span className="icon">📊</span> Mis Propiedades
            </li>
            <li 
              className={activeTab === 'new' ? 'active' : ''} 
              onClick={() => setActiveTab('new')}
            >
              <span className="icon">➕</span> Subir Propiedad
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">AD</div>
            <div className="info">
              <span className="name">Administrador</span>
              <span className="role">Gerente General</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="main-header-admin">
          <h1 className="page-title">
            {activeTab === 'list' ? 'Mis Propiedades' : 'Subir Nueva Propiedad'}
          </h1>
          <div className="header-actions">
            <button className="btn-icon">🔔</button>
            <button className="btn-icon">⚙️</button>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === 'list' && (
            <div className="dashboard-view">
              <div className="stats-row">
                <div className="stat-card">
                  <h3>Total Propiedades</h3>
                  <p className="value">45</p>
                </div>
                <div className="stat-card">
                  <h3>En Venta</h3>
                  <p className="value">30</p>
                </div>
                <div className="stat-card">
                  <h3>En Arriendo</h3>
                  <p className="value">15</p>
                </div>
              </div>

              <div className="table-card">
                <div className="table-header">
                  <h2>Inventario Activo</h2>
                  <div className="table-actions">
                    <input type="text" placeholder="Buscar propiedad..." className="search-input" />
                    <button className="btn-secondary">Filtros</button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID / REF</th>
                        <th>Propiedad</th>
                        <th>Tipo</th>
                        <th>Operación</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="ref-id">#BV-1001</span></td>
                        <td>
                          <div className="prop-name">Casa en Lo Barnechea</div>
                          <div className="prop-agent">Juan Pérez</div>
                        </td>
                        <td>Casa</td>
                        <td>Venta</td>
                        <td className="price-col">UF 25.000</td>
                        <td><span className="badge status-pub">Publicada</span></td>
                        <td>
                          <button className="btn-action">✏️</button>
                          <button className="btn-action">🗑️</button>
                        </td>
                      </tr>
                      <tr>
                        <td><span className="ref-id">#BV-1002</span></td>
                        <td>
                          <div className="prop-name">Oficina Premium Las Condes</div>
                          <div className="prop-agent">María Gómez</div>
                        </td>
                        <td>Oficina</td>
                        <td>Arriendo</td>
                        <td className="price-col">UF 120/mes</td>
                        <td><span className="badge status-pub">Publicada</span></td>
                        <td>
                          <button className="btn-action">✏️</button>
                          <button className="btn-action">🗑️</button>
                        </td>
                      </tr>
                      <tr>
                        <td><span className="ref-id">#BV-1003</span></td>
                        <td>
                          <div className="prop-name">Penthouse Vitacura</div>
                          <div className="prop-agent">Carlos Ruiz</div>
                        </td>
                        <td>Depto</td>
                        <td>Venta</td>
                        <td className="price-col">UF 15.500</td>
                        <td><span className="badge status-draft">Borrador</span></td>
                        <td>
                          <button className="btn-action">✏️</button>
                          <button className="btn-action">🗑️</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'new' && (
            <div className="form-card">
              <form className="upload-form" onSubmit={(e) => { 
                e.preventDefault(); 
                alert('Propiedad guardada correctamente'); 
                setActiveTab('list'); 
              }}>
                <div className="form-section">
                  <h3>Información Básica</h3>
                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Título de la Publicación</label>
                      <input type="text" placeholder="Ej: Espectacular Casa en Condominio..." required />
                    </div>
                    <div className="form-group flex-1">
                      <label>Código Referencia</label>
                      <input type="text" placeholder="Ej: BV-1045" />
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3>Clasificación y Precio</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Tipo de Propiedad</label>
                      <select required>
                        <option value="">Seleccione...</option>
                        <option>Casa</option>
                        <option>Departamento</option>
                        <option>Oficina</option>
                        <option>Comercial</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Operación</label>
                      <select required>
                        <option value="">Seleccione...</option>
                        <option>Venta</option>
                        <option>Arriendo</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Precio (UF)</label>
                      <input type="number" placeholder="Ej: 5000" required />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Multimedia</h3>
                  <div className="form-group">
                    <label>Fotografías</label>
                    <div className="dropzone">
                      <div className="dropzone-content">
                        <span className="drop-icon">📸</span>
                        <p>Arrastra tus fotos premium aquí</p>
                        <span className="drop-hint">o haz clic para examinar (JPG, PNG)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions-footer">
                  <button type="button" className="btn-ghost" onClick={() => setActiveTab('list')}>Cancelar</button>
                  <button type="submit" className="btn-primary">Guardar Propiedad</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
