import {
  observer,
  useAuthStore,
  useCharacterStore,
  useUIStore
} from "/build/_shared/chunk-GG4VG7UO.js";
import {
  useNavigate
} from "/build/_shared/chunk-G6VKD3F6.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-2YTUEFJK.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/characters.tsx
var import_react2 = __toESM(require_react(), 1);

// src/app/components/CharacterCard.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var CharacterCard = observer(({ character }) => {
  const characterStore = useCharacterStore();
  const isFavorite = characterStore.isFavorite(character.id);
  const handleImageError = (e) => {
    const target = e.target;
    target.onerror = null;
    target.src = `https://placehold.co/200x200/4B5563/FFFFFF?text=${character.name.substring(0, 1)}`;
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "character-card", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: character.image, alt: character.name, onError: handleImageError }, void 0, false, {
        fileName: "src/app/components/CharacterCard.tsx",
        lineNumber: 21,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "button",
        {
          onClick: () => characterStore.toggleFavorite(character),
          className: `favorite-btn ${isFavorite ? "active" : ""}`,
          title: isFavorite ? "Remover de favoritos" : "Agregar a favoritos",
          children: isFavorite ? "\u2764\uFE0F" : "\u{1F90D}"
        },
        void 0,
        false,
        {
          fileName: "src/app/components/CharacterCard.tsx",
          lineNumber: 22,
          columnNumber: 5
        },
        this
      )
    ] }, void 0, true, {
      fileName: "src/app/components/CharacterCard.tsx",
      lineNumber: 20,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "character-card-content", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-bold mb-3", children: character.name }, void 0, false, {
        fileName: "src/app/components/CharacterCard.tsx",
        lineNumber: 31,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-400 font-semibold", children: "\u26A1" }, void 0, false, {
            fileName: "src/app/components/CharacterCard.tsx",
            lineNumber: 34,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-300", children: [
            "Estado: ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-400 font-semibold", children: character.status }, void 0, false, {
              fileName: "src/app/components/CharacterCard.tsx",
              lineNumber: 35,
              columnNumber: 47
            }, this)
          ] }, void 0, true, {
            fileName: "src/app/components/CharacterCard.tsx",
            lineNumber: 35,
            columnNumber: 7
          }, this)
        ] }, void 0, true, {
          fileName: "src/app/components/CharacterCard.tsx",
          lineNumber: 33,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-green-400 font-semibold", children: "\u{1F9EC}" }, void 0, false, {
            fileName: "src/app/components/CharacterCard.tsx",
            lineNumber: 38,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-300", children: [
            "Especie: ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-green-400 font-semibold", children: character.species }, void 0, false, {
              fileName: "src/app/components/CharacterCard.tsx",
              lineNumber: 39,
              columnNumber: 48
            }, this)
          ] }, void 0, true, {
            fileName: "src/app/components/CharacterCard.tsx",
            lineNumber: 39,
            columnNumber: 7
          }, this)
        ] }, void 0, true, {
          fileName: "src/app/components/CharacterCard.tsx",
          lineNumber: 37,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-purple-400 font-semibold", children: "\u{1F464}" }, void 0, false, {
            fileName: "src/app/components/CharacterCard.tsx",
            lineNumber: 42,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-300", children: [
            "G\xE9nero: ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-purple-400 font-semibold", children: character.gender }, void 0, false, {
              fileName: "src/app/components/CharacterCard.tsx",
              lineNumber: 43,
              columnNumber: 47
            }, this)
          ] }, void 0, true, {
            fileName: "src/app/components/CharacterCard.tsx",
            lineNumber: 43,
            columnNumber: 7
          }, this)
        ] }, void 0, true, {
          fileName: "src/app/components/CharacterCard.tsx",
          lineNumber: 41,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-cyan-400 font-semibold", children: "\u{1F30D}" }, void 0, false, {
            fileName: "src/app/components/CharacterCard.tsx",
            lineNumber: 46,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-300", children: [
            "Origen: ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-cyan-400 font-semibold", children: character.origin.name }, void 0, false, {
              fileName: "src/app/components/CharacterCard.tsx",
              lineNumber: 47,
              columnNumber: 47
            }, this)
          ] }, void 0, true, {
            fileName: "src/app/components/CharacterCard.tsx",
            lineNumber: 47,
            columnNumber: 7
          }, this)
        ] }, void 0, true, {
          fileName: "src/app/components/CharacterCard.tsx",
          lineNumber: 45,
          columnNumber: 6
        }, this)
      ] }, void 0, true, {
        fileName: "src/app/components/CharacterCard.tsx",
        lineNumber: 32,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/components/CharacterCard.tsx",
      lineNumber: 30,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/components/CharacterCard.tsx",
    lineNumber: 19,
    columnNumber: 3
  }, this);
});
var CharacterCard_default = CharacterCard;

// src/app/components/CharacterGrid.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
var CharacterGrid = ({ characters }) => {
  if (!characters || characters.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "info-message", children: "No characters to display." }, void 0, false, {
      fileName: "src/app/components/CharacterGrid.tsx",
      lineNumber: 9,
      columnNumber: 10
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "character-grid", children: characters.map((character) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CharacterCard_default, { character }, character.id, false, {
    fileName: "src/app/components/CharacterGrid.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this)) }, void 0, false, {
    fileName: "src/app/components/CharacterGrid.tsx",
    lineNumber: 12,
    columnNumber: 3
  }, this);
};
var CharacterGrid_default = CharacterGrid;

// src/app/components/FavoritesSidebar.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
var FavoritesSidebar = observer(() => {
  const characterStore = useCharacterStore();
  const uiStore = useUIStore();
  if (!uiStore.sidebarOpen)
    return null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "favorites-sidebar fixed right-0 top-0 h-full w-80 overflow-y-auto z-50", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "p-6 border-b border-neon-purple", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h2", { className: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400", children: [
        "\u2B50 Favoritos (",
        characterStore.favoritesCount,
        ")"
      ] }, void 0, true, {
        fileName: "src/app/components/FavoritesSidebar.tsx",
        lineNumber: 16,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "button",
        {
          onClick: () => uiStore.setSidebarOpen(false),
          className: "text-purple-400 hover:text-white transition-colors text-2xl",
          title: "Cerrar sidebar",
          children: "\u2715"
        },
        void 0,
        false,
        {
          fileName: "src/app/components/FavoritesSidebar.tsx",
          lineNumber: 19,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "src/app/components/FavoritesSidebar.tsx",
      lineNumber: 15,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "src/app/components/FavoritesSidebar.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "p-6", children: characterStore.favorites.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "text-6xl mb-4", children: "\u{1F31F}" }, void 0, false, {
        fileName: "src/app/components/FavoritesSidebar.tsx",
        lineNumber: 32,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "text-gray-400 text-lg", children: "No tienes personajes favoritos a\xFAn" }, void 0, false, {
        fileName: "src/app/components/FavoritesSidebar.tsx",
        lineNumber: 33,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "text-gray-500 text-sm mt-2", children: "\xA1Marca algunos personajes como favoritos para verlos aqu\xED!" }, void 0, false, {
        fileName: "src/app/components/FavoritesSidebar.tsx",
        lineNumber: 36,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/components/FavoritesSidebar.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "space-y-6", children: characterStore.favorites.map((character) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "border border-neon-purple rounded-xl p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(CharacterCard_default, { character }, void 0, false, {
        fileName: "src/app/components/FavoritesSidebar.tsx",
        lineNumber: 44,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "button",
        {
          onClick: () => characterStore.toggleFavorite(character),
          className: "mt-4 w-full btn-logout",
          children: "\u274C Remover de favoritos"
        },
        void 0,
        false,
        {
          fileName: "src/app/components/FavoritesSidebar.tsx",
          lineNumber: 45,
          columnNumber: 17
        },
        this
      )
    ] }, character.id, true, {
      fileName: "src/app/components/FavoritesSidebar.tsx",
      lineNumber: 43,
      columnNumber: 15
    }, this)) }, void 0, false, {
      fileName: "src/app/components/FavoritesSidebar.tsx",
      lineNumber: 41,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "src/app/components/FavoritesSidebar.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/components/FavoritesSidebar.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
});

// src/app/components/Layout.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
var Layout = observer(({ children }) => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const uiStore = useUIStore();
  const handleLogout = () => {
    authStore.logout();
    navigate("/");
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: `min-h-screen ${uiStore.isDarkMode ? "bg-space" : "bg-darker"} text-white font-inter flex flex-col items-center py-8`, children: [
    (authStore.isAuthenticated || authStore.token) && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "page-container mb-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "space-header rounded-xl p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex items-center space-x-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { className: "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400", children: "Rick & Morty App" }, void 0, false, {
        fileName: "src/app/components/Layout.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "src/app/components/Layout.tsx",
        lineNumber: 26,
        columnNumber: 8
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex justify-end space-x-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
        "button",
        {
          onClick: handleLogout,
          className: "btn-logout",
          children: "\u{1F6AA} Logout"
        },
        void 0,
        false,
        {
          fileName: "src/app/components/Layout.tsx",
          lineNumber: 33,
          columnNumber: 9
        },
        this
      ) }, void 0, false, {
        fileName: "src/app/components/Layout.tsx",
        lineNumber: 32,
        columnNumber: 8
      }, this)
    ] }, void 0, true, {
      fileName: "src/app/components/Layout.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this) }, void 0, false, {
      fileName: "src/app/components/Layout.tsx",
      lineNumber: 24,
      columnNumber: 6
    }, this) }, void 0, false, {
      fileName: "src/app/components/Layout.tsx",
      lineNumber: 23,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("main", { className: "nextjs-layout-container", children }, void 0, false, {
      fileName: "src/app/components/Layout.tsx",
      lineNumber: 45,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "src/app/components/Layout.tsx",
    lineNumber: 20,
    columnNumber: 3
  }, this);
});
var Layout_default = Layout;

// app/routes/characters.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/characters.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/characters.tsx"
  );
  import.meta.hot.lastModified = "1757016699023.1409";
}
var CharactersPage = _s(observer(_c = _s(() => {
  _s();
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const characterStore = useCharacterStore();
  const uiStore = useUIStore();
  (0, import_react2.useEffect)(() => {
    if (!authStore.isLoggedIn) {
      navigate("/");
      return;
    }
    if (characterStore.characters.length === 0) {
      characterStore.fetchCharacters();
    }
  }, [authStore.isLoggedIn, characterStore.characters.length, navigate]);
  if (!authStore.isLoggedIn) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Layout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "min-h-screen bg-gradient-to-br from-space via-nebula to-darker", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "space-header border-b border-neon-blue", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "page-container py-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-6 sm:space-y-0", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h1", { className: "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2", children: characterStore.showOnlyFavorites ? "Mis Favoritos" : "Personajes de Rick y Morty" }, void 0, false, {
          fileName: "app/routes/characters.tsx",
          lineNumber: 54,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-gray-300 text-lg", children: characterStore.showOnlyFavorites ? `${characterStore.filteredCharacters.length} favoritos encontrados` : `${characterStore.charactersCount} personajes encontrados en el multiverso` }, void 0, false, {
          fileName: "app/routes/characters.tsx",
          lineNumber: 57,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 53,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { type: "text", placeholder: "Buscar personajes...", value: characterStore.searchTerm, onChange: (e) => characterStore.setSearchTerm(e.target.value), className: "px-4 py-2 bg-space/50 border border-neon-blue/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all duration-300 w-full sm:w-64" }, void 0, false, {
            fileName: "app/routes/characters.tsx",
            lineNumber: 65,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-blue", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }, void 0, false, {
            fileName: "app/routes/characters.tsx",
            lineNumber: 68,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/characters.tsx",
            lineNumber: 67,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/characters.tsx",
            lineNumber: 66,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/characters.tsx",
          lineNumber: 64,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: () => characterStore.toggleShowOnlyFavorites(), className: `px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neon-blue ${characterStore.showOnlyFavorites ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" : "bg-gradient-to-r from-space-blue to-nebula border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-space"}`, children: characterStore.showOnlyFavorites ? "Ver Todos" : "Solo Favoritos" }, void 0, false, {
          fileName: "app/routes/characters.tsx",
          lineNumber: 74,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: () => {
          authStore.logout();
          navigate("/");
        }, className: "px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400", children: "Cerrar Sesi\xF3n" }, void 0, false, {
          fileName: "app/routes/characters.tsx",
          lineNumber: 79,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 62,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/characters.tsx",
      lineNumber: 52,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/characters.tsx",
      lineNumber: 51,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/characters.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "page-container py-8", children: characterStore.loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex justify-center items-center min-h-96", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "animate-spin rounded-full h-16 w-16 border-b-2 border-neon-blue mx-auto mb-4" }, void 0, false, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 94,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-gray-300 text-lg", children: "Cargando personajes del multiverso..." }, void 0, false, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 95,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/characters.tsx",
      lineNumber: 93,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/routes/characters.tsx",
      lineNumber: 92,
      columnNumber: 37
    }, this) : characterStore.error ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-red-400 text-xl mb-4", children: "\xA1Oh no! Algo sali\xF3 mal en el multiverso" }, void 0, false, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 98,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-gray-300 mb-6", children: characterStore.error }, void 0, false, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 99,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { onClick: () => characterStore.fetchCharacters(), className: "px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105", children: "Intentar de nuevo" }, void 0, false, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 100,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/characters.tsx",
      lineNumber: 97,
      columnNumber: 45
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "lg:col-span-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(CharacterGrid_default, { characters: characterStore.characters }, void 0, false, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 106,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 105,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "lg:col-span-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(FavoritesSidebar, {}, void 0, false, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 111,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/characters.tsx",
        lineNumber: 110,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/characters.tsx",
      lineNumber: 103,
      columnNumber: 22
    }, this) }, void 0, false, {
      fileName: "app/routes/characters.tsx",
      lineNumber: 91,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/characters.tsx",
    lineNumber: 48,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/characters.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
}, "06eZRkq+n27Fntw4EvvWBpEuwRI=", false, function() {
  return [useNavigate, useAuthStore, useCharacterStore, useUIStore];
})), "06eZRkq+n27Fntw4EvvWBpEuwRI=", false, function() {
  return [useNavigate, useAuthStore, useCharacterStore, useUIStore];
});
_c2 = CharactersPage;
var characters_default = CharactersPage;
var _c;
var _c2;
$RefreshReg$(_c, "CharactersPage$observer");
$RefreshReg$(_c2, "CharactersPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  characters_default as default
};
//# sourceMappingURL=/build/routes/characters-RIVIAXAA.js.map
