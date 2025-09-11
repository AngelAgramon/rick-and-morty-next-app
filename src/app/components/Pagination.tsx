// components/Pagination.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = observer(({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  loading = false
}) => {
  // Calcular el rango de páginas a mostrar
  const getPageNumbers = () => {
    const delta = 2; // Número de páginas a mostrar a cada lado de la página actual
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '24px 0',
      borderTop: '1px solid #334155',
      marginTop: '32px'
    }}>
      {/* Información de paginación */}
      <div style={{
        color: '#94a3b8',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        Mostrando {startItem}-{endItem} de {totalItems} personajes
      </div>

      {/* Controles de paginación */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Botón Anterior */}
        <button
          onClick={() => {
            console.log('🔄 [Pagination] Previous button clicked, going to page:', currentPage - 1);
            onPageChange(currentPage - 1);
          }}
          disabled={currentPage === 1 || loading}
          style={{
            padding: '8px 12px',
            backgroundColor: currentPage === 1 ? '#1e293b' : '#334155',
            color: currentPage === 1 ? '#64748b' : '#f8fafc',
            border: '1px solid #475569',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            opacity: currentPage === 1 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (currentPage > 1) {
              (e.target as HTMLButtonElement).style.backgroundColor = '#475569';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage > 1) {
              (e.target as HTMLButtonElement).style.backgroundColor = '#334155';
            }
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>

        {/* Números de página */}
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span style={{
                color: '#64748b',
                fontSize: '14px',
                padding: '8px 4px'
              }}>
                ...
              </span>
            ) : (
              <button
                onClick={() => {
                  console.log('🔄 [Pagination] Page number clicked:', page);
                  onPageChange(page as number);
                }}
                disabled={loading}
                style={{
                  padding: '8px 12px',
                  backgroundColor: page === currentPage ? '#3b82f6' : '#334155',
                  color: page === currentPage ? '#ffffff' : '#f8fafc',
                  border: page === currentPage ? 'none' : '1px solid #475569',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: page === currentPage ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: '40px',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  if (page !== currentPage) {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#475569';
                  }
                }}
                onMouseLeave={(e) => {
                  if (page !== currentPage) {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#334155';
                  }
                }}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Botón Siguiente */}
        <button
          onClick={() => {
            console.log('🔄 [Pagination] Next button clicked, going to page:', currentPage + 1);
            onPageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages || loading}
          style={{
            padding: '8px 12px',
            backgroundColor: currentPage === totalPages ? '#1e293b' : '#334155',
            color: currentPage === totalPages ? '#64748b' : '#f8fafc',
            border: '1px solid #475569',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            opacity: currentPage === totalPages ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (currentPage < totalPages) {
              (e.target as HTMLButtonElement).style.backgroundColor = '#475569';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage < totalPages) {
              (e.target as HTMLButtonElement).style.backgroundColor = '#334155';
            }
          }}
        >
          Siguiente
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Información adicional */}
      <div style={{
        color: '#64748b',
        fontSize: '12px',
        textAlign: 'center'
      }}>
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
});

export default Pagination;
