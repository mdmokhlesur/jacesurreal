"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Play, Heart, Save, ArrowLeft, RefreshCw, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [tracks, setTracks] = useState([
    { id: 1, title: "Midnight City", plays: 1250, likes: 450 },
    { id: 2, title: "Sonic Boom", plays: 890, likes: 320 },
    { id: 3, title: "Electric Dreams", plays: 2100, likes: 780 },
    { id: 4, title: "Virtual Insanity", plays: 540, likes: 120 },
    { id: 5, title: "Neon Nights", plays: 3200, likes: 1100 },
    { id: 6, title: "Cyberpunk 2077", plays: 15600, likes: 4200 },
    { id: 7, title: "Acid Rain", plays: 430, likes: 88 },
    { id: 8, title: "Deep Sea", plays: 210, likes: 45 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTracks, setFilteredTracks] = useState(tracks);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Last Request Mechanism
  const lastRequestId = useRef(0);

  // Debouncing logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // "Last Request True" Mechanism (Search)
  useEffect(() => {
    const requestId = ++lastRequestId.current;
    
    const fetchResults = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Only update if this is the latest request
      if (requestId === lastRequestId.current) {
        const results = tracks.filter(t => 
          t.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setFilteredTracks(results);
        setIsLoading(false);
        setCurrentPage(1);
      }
    };

    fetchResults();
  }, [debouncedQuery, tracks]);

  const handleUpdate = (id: number, field: "plays" | "likes", value: string) => {
    setTracks(prev => prev.map(t => t.id === id ? { ...t, [field]: parseInt(value) || 0 } : t));
  };

  const totalPages = Math.ceil(filteredTracks.length / itemsPerPage);
  const paginatedTracks = filteredTracks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-left">
          <Link href="/" className="back-btn">
            <ArrowLeft size={20} />
          </Link>
          <h1>Admin Studio</h1>
        </div>
        <button className="refresh-btn">
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          {isLoading ? "Updating..." : "Sync"}
        </button>
      </div>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          {/* Top: Song Add Form */}
          <div className="admin-card track-creator">
            <div className="card-header">
              <h2>New Masterpiece</h2>
              <p>Add to library</p>
            </div>
            <form className="admin-create-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group-admin">
                <label>Title</label>
                <input type="text" placeholder="Track Name" />
              </div>
              <div className="input-row-admin">
                <div className="input-group-admin">
                  <label>Plays</label>
                  <input type="number" placeholder="0" />
                </div>
                <div className="input-group-admin">
                  <label>Likes</label>
                  <input type="number" placeholder="0" />
                </div>
              </div>
              <button className="create-track-btn">
                <Music size={18} /> Publish
              </button>
            </form>
          </div>

          {/* Bottom: Overview Stats */}
          <div className="admin-card stats-overview">
            <h2>Overview</h2>
            <div className="mini-stats">
              <div className="mini-stat">
                <span className="label">Total Plays</span>
                <span className="value">23.5K</span>
              </div>
              <div className="mini-stat">
                <span className="label">Total Likes</span>
                <span className="value">6.8K</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="admin-content">
          <div className="admin-card track-editor full-height">
            <div className="content-header-row">
              <div className="card-header">
                <h2>Manage Catalog</h2>
                <p>{isLoading ? "Searching..." : `${filteredTracks.length} tracks found`}</p>
              </div>
              <div className="admin-search-wrapper">
                {isLoading ? <Loader2 size={16} className="search-loader animate-spin" /> : <Search size={16} />}
                <input 
                  type="text" 
                  placeholder="Filter tracks..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className={`track-list-admin scrollable ${isLoading ? 'opacity-50' : ''}`}>
              {paginatedTracks.map(track => (
                <div key={track.id} className="admin-track-item">
                  <div className="track-info-simple">
                    <div className="track-icon">
                      <Music size={20} />
                    </div>
                    <div>
                      <h3>{track.title}</h3>
                      <span className="track-id">ID: #{track.id}</span>
                    </div>
                  </div>

                  <div className="track-inputs">
                    <div className="input-field-admin">
                      <label><Play size={12} /> Plays</label>
                      <input 
                        type="number" 
                        value={track.plays}
                        onChange={(e) => handleUpdate(track.id, "plays", e.target.value)}
                      />
                    </div>
                    <div className="input-field-admin">
                      <label><Heart size={12} /> Likes</label>
                      <input 
                        type="number" 
                        value={track.likes}
                        onChange={(e) => handleUpdate(track.id, "likes", e.target.value)}
                      />
                    </div>
                    <button className="save-track-btn" title="Save Changes">
                      <Save size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {!isLoading && filteredTracks.length === 0 && (
                <div className="empty-state">
                  <p>No tracks found matching your search.</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="admin-pagination">
                <button 
                  disabled={currentPage === 1 || isLoading}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="page-btn"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                      disabled={isLoading}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  disabled={currentPage === totalPages || isLoading}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="page-btn"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
