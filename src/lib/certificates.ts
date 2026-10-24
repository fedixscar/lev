import QRCode from "qrcode";

export interface BottleCertificate {
  token: string;
  serialNumber: string;
  orderNumber: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  productName: string;
  productSlug: string;
  formatSize: string;
  batchCode: string;
  bottlingDate: string;
  status: "Scellé & Certifié" | "En Préparation" | "Expédié" | "Livré";
  videoUrl?: string;
  videoTitle?: string;
  videoNotes?: string;
  qrDataUrl?: string;
  createdAt: string;
}

const STORAGE_KEY = "levania_bottle_certificates";
export const CERTIFICATES_UPDATED_EVENT = "levania_certificates_updated";

/**
 * Returns all stored bottle certificates.
 */
export function getAllCertificates(): BottleCertificate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

/**
 * Finds a certificate by its unique token or serial number.
 */
export function getCertificateByToken(token: string): BottleCertificate | null {
  const all = getAllCertificates();
  const normalized = token.trim().toLowerCase();
  return (
    all.find(
      (c) =>
        c.token.toLowerCase() === normalized ||
        c.serialNumber.toLowerCase() === normalized
    ) || null
  );
}

/**
 * Saves or updates a certificate in localStorage.
 */
export function saveCertificate(cert: BottleCertificate): BottleCertificate[] {
  const all = getAllCertificates();
  const index = all.findIndex((c) => c.token === cert.token);
  let updated: BottleCertificate[];

  if (index >= 0) {
    updated = [...all];
    updated[index] = cert;
  } else {
    updated = [cert, ...all];
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(CERTIFICATES_UPDATED_EVENT));
    } catch {
      // ignore
    }
  }
  return updated;
}

/**
 * Updates video details for a specific certificate.
 */
export function updateCertificateVideo(
  token: string,
  videoUrl: string,
  videoTitle?: string,
  videoNotes?: string
): BottleCertificate | null {
  const all = getAllCertificates();
  const index = all.findIndex((c) => c.token === token);
  if (index === -1) return null;

  const updatedCert: BottleCertificate = {
    ...all[index],
    videoUrl,
    videoTitle: videoTitle || all[index].videoTitle,
    videoNotes: videoNotes || all[index].videoNotes,
  };

  saveCertificate(updatedCert);
  return updatedCert;
}

const IDB_NAME = "levania_media_db";
const IDB_STORE = "bottle_videos";
const IDB_VERSION = 1;

function openVideoDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      return reject(new Error("IndexedDB not available"));
    }
    const request = indexedDB.open(IDB_NAME, IDB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Stores a video file or blob in IndexedDB to avoid localStorage quota limits.
 * Returns reference string: "idb:<token>"
 */
export async function storeVideoFile(token: string, blob: Blob | File | string): Promise<string> {
  try {
    const db = await openVideoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      const store = tx.objectStore(IDB_STORE);
      const req = store.put(blob, token);
      req.onsuccess = () => resolve(`idb:${token}`);
      req.onerror = () => reject(req.error);
    });
  } catch {
    if (typeof blob === "string") return blob;
    return "";
  }
}

/**
 * Resolves a videoUrl string. If it starts with "idb:", fetches the Blob from IndexedDB
 * and creates an Object URL for playback. Otherwise returns the URL as is.
 */
export async function retrieveVideoUrl(videoUrlOrTokenRef?: string): Promise<string> {
  if (!videoUrlOrTokenRef) return "";
  if (!videoUrlOrTokenRef.startsWith("idb:")) return videoUrlOrTokenRef;
  const token = videoUrlOrTokenRef.slice(4);
  try {
    const db = await openVideoDB();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(token);
      req.onsuccess = () => {
        const result = req.result;
        if (!result) return resolve("");
        if (typeof result === "string") return resolve(result);
        if (result instanceof Blob) {
          const objectUrl = URL.createObjectURL(result);
          return resolve(objectUrl);
        }
        resolve("");
      };
      req.onerror = () => resolve("");
    });
  } catch {
    return "";
  }
}

/**
 * Deletes a stored video from IndexedDB for a given token.
 */
export async function deleteVideoFile(token: string): Promise<void> {
  try {
    const db = await openVideoDB();
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).delete(token);
  } catch {
    // ignore
  }
}

/**
 * Automatically creates unique bottle certificates with QR codes for each bottle in an order.
 */
export async function generateCertificatesForOrder(order: {
  id: string;
  number: string;
  customer: string;
  email: string;
  phone?: string;
  itemsList?: Array<{
    name: string;
    size: string;
    quantity: number;
    priceTND?: number;
    image?: string;
  }>;
  items?: string;
}): Promise<BottleCertificate[]> {
  const certificates: BottleCertificate[] = [];
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://levania-parfums.com";

  const currentDate = new Date();
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const bottlingDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  const batchCode = `LOT-${currentDate.getFullYear()}-MEDIT-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

  // If structured itemsList is present, iterate per quantity of each bottle
  const items =
    order.itemsList && order.itemsList.length > 0
      ? order.itemsList
      : [
          {
            name: order.items || "Flacon d'Exception",
            size: "100ml",
            quantity: 1,
          },
        ];

  let bottleIndex = 1;
  for (const item of items) {
    const qty = Math.max(1, item.quantity || 1);
    const slug = item.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    for (let i = 0; i < qty; i++) {
      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const token = `cert-${Date.now().toString(36)}-${randomSuffix.toLowerCase()}`;
      const serialNumber = `LEV-FLA-${currentDate.getFullYear()}-${randomSuffix}`;
      const qrUrl = `${origin}/p/${token}`;

      let qrDataUrl = "";
      try {
        qrDataUrl = await QRCode.toDataURL(qrUrl, {
          margin: 1,
          width: 320,
          color: {
            dark: "#541B28", // Imperial Burgundy
            light: "#FAF7F2", // Ivory
          },
        });
      } catch {
        qrDataUrl = "";
      }

      const cert: BottleCertificate = {
        token,
        serialNumber,
        orderNumber: order.number,
        orderId: order.id,
        customerName: order.customer,
        customerEmail: order.email,
        customerPhone: order.phone,
        productName: item.name,
        productSlug: slug,
        formatSize: item.size || "100ml",
        batchCode,
        bottlingDate,
        status: "Scellé & Certifié",
        qrDataUrl,
        createdAt: new Date().toISOString(),
      };

      certificates.push(cert);
      bottleIndex++;
    }
  }

  // Save all newly generated certificates to store
  for (const c of certificates) {
    saveCertificate(c);
  }

  return certificates;
}
