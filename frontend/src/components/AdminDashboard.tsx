import { useState, useEffect, useRef } from 'react';
import type { Property } from '../types/property';
import {
  fetchProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadImages
} from '../services/api';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterTag, setFilterTag] = useState<'Todos' | 'Venta' | 'Arriendo'>('Todos');
  const [filterType, setFilterType] = useState<'Todos' | 'Casa' | 'Oficina' | 'Bodega' | 'Terreno'>('Todos');

  // Form State
  const [code, setCode] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [curatorComment, setCuratorComment] = useState<string>('');
  const [tag, setTag] = useState<'Venta' | 'Arriendo'>('Venta');
  const [type, setType] = useState<'Oficina' | 'Bodega' | 'Terreno' | 'Casa'>('Casa');
  const [sector, setSector] = useState<string>('');
  const [comuna, setComuna] = useState<string>('');
  const [priceUF, setPriceUF] = useState<string>('');
  const [priceCLP, setPriceCLP] = useState<string>('');
  const [builtArea, setBuiltArea] = useState<string>('');
  const [terrainArea, setTerrainArea] = useState<string>('');
  const [features, setFeatures] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load properties on mount
  useEffect(() => {
    loadProperties();
  }, []);

  // Recalculate CLP based on UF (optional helper)
  const handleAutoCLP = () => {
    const ufVal = Number(priceUF);
    if (!isNaN(ufVal) && ufVal > 0) {
      // Reference UF rate for conversion
      const ufRate = 38000;
      setPriceCLP(Math.round(ufVal * ufRate).toString());
    }
  };

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await fetchProperties();
      setProperties(data);
    } catch (err: any) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, propertyCode: string) => {
    const isBypass = new URLSearchParams(window.location.search).has('bypassConfirm');
    if (isBypass || confirm(`¿Estás seguro de que deseas eliminar la propiedad con código ${propertyCode}?`)) {
      try {
        await deleteProperty(id);
        setProperties(properties.filter((p) => p.id !== id));
      } catch (err: any) {
        alert(`Error al eliminar la propiedad: ${err.message}`);
      }
    }
  };

  const handleEditClick = (property: Property) => {
    setEditingProperty(property);
    setCode(property.code);
    setTitle(property.title);
    setDescription(property.description);
    setCuratorComment(property.curatorComment || '');
    setTag(property.tag);
    setType(property.type);
    setSector(property.sector);
    setComuna(property.comuna);
    setPriceUF(property.priceUF.toString());
    setPriceCLP(property.priceCLP.toString());
    setBuiltArea(property.builtArea.toString());
    setTerrainArea(property.terrainArea ? property.terrainArea.toString() : '');
    setFeatures(property.features);
    setImages(property.images);
    setErrorMsg('');
    setActiveTab('form');
  };

  const handleNewClick = () => {
    setEditingProperty(null);
    setCode('');
    setTitle('');
    setDescription('');
    setCuratorComment('');
    setTag('Venta');
    setType('Casa');
    setSector('');
    setComuna('');
    setPriceUF('');
    setPriceCLP('');
    setBuiltArea('');
    setTerrainArea('');
    setFeatures([]);
    setImages([]);
    setErrorMsg('');
    setActiveTab('form');
  };

  // Features Tag Handlers
  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFeature = currentFeature.trim();
    if (cleanFeature && !features.includes(cleanFeature)) {
      setFeatures([...features, cleanFeature]);
      setCurrentFeature('');
    }
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    setFeatures(features.filter((f) => f !== featureToRemove));
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setErrorMsg('');
      const fileArray = Array.from(files);
      const uploadedUrls = await uploadImages(fileArray);
      setImages([...images, ...uploadedUrls]);
    } catch (err: any) {
      setErrorMsg(`Error al subir imágenes: ${err.message}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (urlToRemove: string) => {
    setImages(images.filter((img) => img !== urlToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const payload = {
      code,
      title,
      description,
      curatorComment: curatorComment.trim() || undefined,
      tag,
      type,
      sector,
      comuna,
      priceUF: Number(priceUF),
      priceCLP: Number(priceCLP),
      builtArea: Number(builtArea),
      terrainArea: terrainArea ? Number(terrainArea) : undefined,
      features,
      images,
    };

    try {
      if (editingProperty) {
        await updateProperty(editingProperty.id, { ...payload, id: editingProperty.id });
      } else {
        await createProperty(payload);
      }
      await loadProperties();
      setActiveTab('list');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al guardar la propiedad.');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter properties
  const filteredProperties = properties.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.comuna.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sector.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = filterTag === 'Todos' || p.tag === filterTag;
    const matchesType = filterType === 'Todos' || p.type === filterType;

    return matchesSearch && matchesTag && matchesType;
  });

  // Calculate statistics
  const totalCount = properties.length;
  const ventaCount = properties.filter((p) => p.tag === 'Venta').length;
  const arriendoCount = properties.filter((p) => p.tag === 'Arriendo').length;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="admin-logo">Buenos Vientos <span>Admin</span></div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeTab === 'list' ? 'active' : ''} 
              onClick={() => {
                setActiveTab('list');
                setEditingProperty(null);
              }}
            >
              <span className="icon">📊</span> Mis Propiedades
            </li>
            <li 
              className={activeTab === 'form' && !editingProperty ? 'active' : ''} 
              onClick={handleNewClick}
            >
              <span className="icon">➕</span> Subir Propiedad
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">BC</div>
            <div className="info">
              <span className="name">Beatriz Cornejo</span>
              <span className="role">Administradora</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="admin-main">
        <header className="main-header-admin">
          <h1 className="page-title">
            {activeTab === 'list' 
              ? 'Mis Propiedades' 
              : editingProperty 
                ? `Editar Propiedad: ${editingProperty.code}` 
                : 'Subir Nueva Propiedad'}
          </h1>
        </header>

        <div className="admin-content">
          {activeTab === 'list' && (
            <div className="dashboard-view">
              {/* Stats */}
              <div className="stats-row">
                <div className="stat-card">
                  <h3>Total Propiedades</h3>
                  <p className="value">{totalCount}</p>
                </div>
                <div className="stat-card">
                  <h3>En Venta</h3>
                  <p className="value">{ventaCount}</p>
                </div>
                <div className="stat-card">
                  <h3>En Arriendo</h3>
                  <p className="value">{arriendoCount}</p>
                </div>
              </div>

              {/* Data Table */}
              <div className="table-card">
                <div className="table-header">
                  <h2>Inventario de Propiedades</h2>
                  <div className="table-actions">
                    <input 
                      type="text" 
                      placeholder="Buscar por código, título, comuna..." 
                      className="search-input" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select 
                      className="filter-select"
                      value={filterTag}
                      onChange={(e) => setFilterTag(e.target.value as any)}
                    >
                      <option value="Todos">Todas las operaciones</option>
                      <option value="Venta">Venta</option>
                      <option value="Arriendo">Arriendo</option>
                    </select>
                    <select 
                      className="filter-select"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as any)}
                    >
                      <option value="Todos">Todos los tipos</option>
                      <option value="Casa">Casa</option>
                      <option value="Oficina">Oficina</option>
                      <option value="Bodega">Bodega</option>
                      <option value="Terreno">Terreno</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando inventario...</p>
                  </div>
                ) : filteredProperties.length === 0 ? (
                  <div className="empty-table-state">
                    <span className="empty-icon">📂</span>
                    <p>No se encontraron propiedades que coincidan con los filtros.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>REF</th>
                          <th>Propiedad</th>
                          <th>Tipo</th>
                          <th>Operación</th>
                          <th>Precio (UF)</th>
                          <th>Precio (CLP)</th>
                          <th>Área</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProperties.map((prop) => (
                          <tr key={prop.id}>
                            <td><span className="ref-id">#{prop.code}</span></td>
                            <td>
                              <div className="prop-name">{prop.title}</div>
                              <div className="prop-agent">{prop.sector}, {prop.comuna}</div>
                            </td>
                            <td>{prop.type}</td>
                            <td>
                              <span className={`badge ${prop.tag === 'Venta' ? 'status-draft' : 'status-pub'}`}>
                                {prop.tag}
                              </span>
                            </td>
                            <td className="price-col">UF {prop.priceUF.toLocaleString('de-DE')}</td>
                            <td className="price-col">CLP ${prop.priceCLP.toLocaleString('de-DE')}</td>
                            <td>{prop.builtArea} m² {prop.terrainArea ? `/ ${prop.terrainArea} m²` : ''}</td>
                            <td>
                              <button 
                                className="btn-action" 
                                title="Editar Propiedad"
                                onClick={() => handleEditClick(prop)}
                              >
                                ✏️
                              </button>
                              <button 
                                className="btn-action" 
                                title="Eliminar Propiedad"
                                onClick={() => handleDelete(prop.id, prop.code)}
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'form' && (
            <div className="form-card">
              {errorMsg && <div className="form-error-banner">⚠️ {errorMsg}</div>}
              
              <form className="upload-form" onSubmit={handleSubmit}>
                {/* Basic Info */}
                <div className="form-section">
                  <h3>Información Básica</h3>
                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Título Comercial de la Publicación</label>
                      <input 
                        type="text" 
                        placeholder="Ej: Espectacular Casa en Condominio Las Brisas" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-group flex-1">
                      <label>Código Referencia (Único)</label>
                      <input 
                        type="text" 
                        placeholder="Ej: BV-01" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Descripción Comercial Completa</label>
                      <textarea 
                        rows={4}
                        placeholder="Detalle todas las características comerciales de la propiedad..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Comentario Especial del Curador (Diseño de Lujo / Garamond Italic)</label>
                      <textarea 
                        rows={2}
                        placeholder="Escriba un comentario editorial, analítico y distinguido sobre el activo..."
                        value={curatorComment}
                        onChange={(e) => setCuratorComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Categorization & Financials */}
                <div className="form-section">
                  <h3>Clasificación, Ubicación y Precios</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Tipo de Activo</label>
                      <select value={type} onChange={(e) => setType(e.target.value as any)} required>
                        <option value="Casa">Casa</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Bodega">Bodega</option>
                        <option value="Terreno">Terreno</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Operación</label>
                      <select value={tag} onChange={(e) => setTag(e.target.value as any)} required>
                        <option value="Venta">Venta</option>
                        <option value="Arriendo">Arriendo</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Sector / Barrio</label>
                      <input 
                        type="text" 
                        placeholder="Ej: Nueva Las Condes" 
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Comuna</label>
                      <input 
                        type="text" 
                        placeholder="Ej: Las Condes" 
                        value={comuna}
                        onChange={(e) => setComuna(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row align-end">
                    <div className="form-group">
                      <label>Precio en UF</label>
                      <input 
                        type="number" 
                        placeholder="Ej: 22000" 
                        value={priceUF}
                        onChange={(e) => setPriceUF(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <div className="flex-row-label">
                        <label>Precio en CLP</label>
                        <button 
                          type="button" 
                          className="btn-tiny-helper" 
                          onClick={handleAutoCLP}
                          title="Convertir UF a CLP usando valor referencial de $38.000"
                        >
                          ⚡ Auto-calcular (38k/UF)
                        </button>
                      </div>
                      <input 
                        type="number" 
                        placeholder="Ej: 836000000" 
                        value={priceCLP}
                        onChange={(e) => setPriceCLP(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Dimensions & Features */}
                <div className="form-section">
                  <h3>Dimensiones y Características Adicionales</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Superficie Construida (m²)</label>
                      <input 
                        type="number" 
                        placeholder="Ej: 350" 
                        value={builtArea}
                        onChange={(e) => setBuiltArea(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Superficie Terreno (m² - Opcional)</label>
                      <input 
                        type="number" 
                        placeholder="Ej: 600" 
                        value={terrainArea}
                        onChange={(e) => setTerrainArea(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Especificaciones / Equipamiento técnico</label>
                      <div className="features-input-container">
                        <input 
                          type="text" 
                          placeholder="Ej: Energía Trifásica (100 KVA) o 4 Estacionamientos..."
                          value={currentFeature}
                          onChange={(e) => setCurrentFeature(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const mockEvent = { preventDefault: () => {} } as React.FormEvent;
                              handleAddFeature(mockEvent);
                            }
                          }}
                        />
                        <button type="button" className="btn-secondary" onClick={handleAddFeature}>Agregar</button>
                      </div>
                      
                      {/* Features tags display */}
                      {features.length > 0 && (
                        <div className="features-tags-list">
                          {features.map((feature, idx) => (
                            <span key={idx} className="feature-pill-tag">
                              {feature}
                              <button 
                                type="button" 
                                className="remove-pill"
                                onClick={() => handleRemoveFeature(feature)}
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Images Upload / Gallery */}
                <div className="form-section">
                  <h3>Galería de Imágenes</h3>
                  
                  {/* Dropzone area */}
                  <div 
                    className={`dropzone ${isUploading ? 'uploading' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      multiple 
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                    <div className="dropzone-content">
                      <span className="drop-icon">📸</span>
                      {isUploading ? (
                        <div>
                          <div className="spinner centering-spinner"></div>
                          <p>Optimizando y convirtiendo imágenes a WebP...</p>
                        </div>
                      ) : (
                        <>
                          <p>Arrastra tus fotografías aquí</p>
                          <span className="drop-hint">o haz clic para examinar desde tu equipo (JPG, PNG)</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Previews gallery */}
                  {images.length > 0 && (
                    <div className="gallery-previews-grid">
                      {images.map((imgUrl, idx) => (
                        <div key={idx} className="gallery-preview-card">
                          <img src={imgUrl} alt={`Preview ${idx + 1}`} />
                          <button 
                            type="button" 
                            className="btn-delete-img"
                            onClick={() => handleRemoveImage(imgUrl)}
                            title="Eliminar imagen"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="form-actions-footer">
                  <button 
                    type="button" 
                    className="btn-ghost" 
                    onClick={() => {
                      setActiveTab('list');
                      setEditingProperty(null);
                    }}
                    disabled={submitting}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={submitting || isUploading}
                  >
                    {submitting 
                      ? 'Guardando...' 
                      : editingProperty 
                        ? 'Guardar Cambios' 
                        : 'Crear Propiedad'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
