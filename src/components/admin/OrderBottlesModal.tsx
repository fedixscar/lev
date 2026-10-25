"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  QrCode,
  Film,
  Upload,
  Check,
  ExternalLink,
  Printer,
  Sparkles,
  Video,
  Play,
  Trash2,
} from "lucide-react";
import { GoldStarLozenge } from "@/components/ui/LuxuryIcons";
import {
  BottleCertificate,
  getAllCertificates,
  saveCertificate,
  updateCertificateVideo,
  generateCertificatesForOrder,
  storeVideoFile,
  retrieveVideoUrl,
  deleteVideoFile,
} from "@/lib/certificates";

interface OrderBottlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    number: string;
    customer: string;
    email: string;
    phone?: string;
    items?: string;
    itemsList?: Array<{
      name: string;
      size: string;
      quantity: number;
      priceTND?: number;
      image?: string;
    }>;
    certificates?: BottleCertificate[];
  } | null;
  onCertificatesUpdated?: () => void;
}

export function OrderBottlesModal({
  isOpen,
  onClose,
  order,
  onCertificatesUpdated,
}: OrderBottlesModalProps) {
  const [certificates, setCertificates] = useState<BottleCertificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<BottleCertificate | null>(null);
  const [videoInputType, setVideoInputType] = useState<"file" | "url">("url");
  const [videoUrl, setVideoUrl] = useState("");
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [videoNotes, setVideoNotes] = useState("");
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const videoFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!order) return;
    const all = getAllCertificates();
    const orderCerts = all.filter(
      (c) => c.orderNumber === order.number || c.orderId === order.id
    );

    setCertificates(orderCerts);
    if (orderCerts.length > 0) {
      setSelectedCert(orderCerts[0]);
      setVideoUrl(orderCerts[0].videoUrl || "");
      setVideoNotes(orderCerts[0].videoNotes || "");
    } else {
      setSelectedCert(null);
      setVideoUrl("");
      setPreviewVideoUrl("");
      setVideoNotes("");
    }
  }, [order, isOpen]);

  useEffect(() => {
    if (!videoUrl) {
      setPreviewVideoUrl("");
      return;
    }
    retrieveVideoUrl(videoUrl).then((resolved) => {
      setPreviewVideoUrl(resolved || videoUrl);
    });
  }, [videoUrl]);

  if (!isOpen || !order) return null;

  const handleGenerateNow = async () => {
    const generated = await generateCertificatesForOrder({
      id: order.id,
      number: order.number,
      customer: order.customer,
      email: order.email,
      phone: order.phone,
      itemsList: order.itemsList,
      items: order.items,
    });
    setCertificates(generated);
    if (generated.length > 0) {
      setSelectedCert(generated[0]);
    }
    if (onCertificatesUpdated) onCertificatesUpdated();
  };

  const handleSelectCert = (cert: BottleCertificate) => {
    setSelectedCert(cert);
    setVideoUrl(cert.videoUrl || "");
    setVideoNotes(cert.videoNotes || "");
    setSaveSuccess(false);
  };

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedCert) return;

    // Check size limit: max 50MB
    if (file.size > 50 * 1024 * 1024) {
      alert("La vidéo dépasse 50 Mo. Veuillez choisir une vidéo plus courte ou insérer un lien direct (YouTube/Vimeo/Cloudinary).");
      return;
    }

    try {
      setIsVideoUploading(true);
      const idbRef = await storeVideoFile(selectedCert.token, file);
      setVideoUrl(idbRef);
      const objUrl = URL.createObjectURL(file);
      setPreviewVideoUrl(objUrl);
      setIsVideoUploading(false);
    } catch {
      setIsVideoUploading(false);
      alert("Erreur lors de l'enregistrement de la vidéo.");
    }
  };

  const handleSaveVideoForCert = () => {
    if (!selectedCert) return;

    const updated = updateCertificateVideo(
      selectedCert.token,
      videoUrl.trim(),
      `Mise en flacon dédiée à ${order.customer}`,
      videoNotes.trim()
    );

    if (updated) {
      setSelectedCert(updated);
      setCertificates((prev) =>
        prev.map((c) => (c.token === updated.token ? updated : c))
      );
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      if (onCertificatesUpdated) onCertificatesUpdated();
    }
  };

  const handleRemoveVideo = async () => {
    if (!selectedCert) return;
    await deleteVideoFile(selectedCert.token);
    const updated = updateCertificateVideo(selectedCert.token, "", "", "");
    if (updated) {
      setSelectedCert(updated);
      setVideoUrl("");
      setPreviewVideoUrl("");
      setVideoNotes("");
      setCertificates((prev) =>
        prev.map((c) => (c.token === updated.token ? updated : c))
      );
      if (onCertificatesUpdated) onCertificatesUpdated();
    }
  };

  const handlePrintLabel = (cert: BottleCertificate) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Étiquette Flacon QR - ${cert.serialNumber}</title>
          <style>
            @page { size: 70mm 100mm; margin: 0; }
            body {
              font-family: 'Cinzel', serif, system-ui;
              margin: 0;
              padding: 20px;
              background: #FAF7F2;
              color: #23181A;
              text-align: center;
              box-sizing: border-box;
            }
            .border-box {
              border: 2px solid #541B28;
              border-radius: 16px;
              padding: 16px 12px;
              background: #FFF;
            }
            .logo {
              font-size: 14px;
              font-weight: 700;
              color: #541B28;
              letter-spacing: 3px;
              text-transform: uppercase;
              margin-bottom: 2px;
            }
            .sub {
              font-size: 8px;
              color: #C7A66A;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 12px;
            }
            .qr-img {
              width: 140px;
              height: 140px;
              margin: 0 auto 10px;
              display: block;
            }
            .title {
              font-size: 13px;
              font-weight: 600;
              color: #23181A;
              margin-bottom: 2px;
            }
            .customer {
              font-size: 10px;
              font-weight: 700;
              color: #541B28;
              margin-bottom: 8px;
            }
            .serial {
              font-family: monospace;
              font-size: 9px;
              color: #756B6D;
              border-top: 1px dashed #541B28;
              padding-top: 6px;
            }
          </style>
        </head>
        <body onload="window.print()">
          <div class="border-box">
            <div class="logo">LÉVANIA</div>
            <div class="sub">Haute Parfumerie &bull; Flacon Scellé</div>
            <img src="${cert.qrDataUrl}" class="qr-img" />
            <div class="title">${cert.productName} (${cert.formatSize})</div>
            <div class="customer">Dédié à : ${cert.customerName}</div>
            <div class="serial">Série : ${cert.serialNumber} &bull; Lot : ${cert.batchCode}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF7F2] dark:bg-[#0E0709] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#541B28]/20 dark:border-[#C7A66A]/30 overflow-hidden flex flex-col max-h-[92vh] text-[#23181A] dark:text-[#FAF7F2]">
        {/* Top Header */}
        <div className="px-6 py-5 bg-white dark:bg-[#180B10] border-b border-[#541B28]/15 dark:border-[#C7A66A]/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#541B28]/10 dark:bg-[#C7A66A]/15 text-[#541B28] dark:text-[#DFC68B] flex items-center justify-center border border-[#541B28]/20 dark:border-[#C7A66A]/30">
              <QrCode className="w-5 h-5 text-[#541B28] dark:text-[#DFC68B]" />
            </div>
            <div>
              <span className="font-cinzel text-[10px] uppercase tracking-grand text-[#541B28] dark:text-[#DFC68B] font-bold block">
                Traçabilité & Vidéo Dédicace Client
              </span>
              <h2 className="font-serif text-2xl text-burgundy-gradient font-light">
                Certificats QR Flacons &bull; Commande {order.number}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#756B6D] dark:text-[#A8989C] hover:text-[#541B28] dark:hover:text-[#DFC68B] hover:bg-[#541B28]/10 dark:hover:bg-[#C7A66A]/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {/* Client summary pill */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#756B6D] dark:text-[#A8989C] font-bold block">Client Destinataire</span>
              <span className="font-serif text-lg font-bold text-[#23181A] dark:text-[#FAF7F2]">{order.customer}</span>
              <span className="text-xs text-[#756B6D] dark:text-[#A8989C] block">{order.email} &bull; {order.phone || "Sans téléphone"}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#756B6D] dark:text-[#A8989C] font-bold block">Total Flacons Détectés</span>
              <span className="font-serif text-lg font-bold text-[#541B28] dark:text-[#DFC68B]">{certificates.length} Flacon(s)</span>
            </div>
          </div>

          {/* If no certificates yet */}
          {certificates.length === 0 ? (
            <div className="text-center py-12 px-6 rounded-3xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/20 space-y-4">
              <QrCode className="w-12 h-12 text-[#541B28]/40 dark:text-[#DFC68B]/40 mx-auto" />
              <div>
                <h3 className="font-serif text-xl text-[#23181A] dark:text-[#FAF7F2] font-semibold mb-1">
                  Aucun Certificat QR encore généré pour cette commande
                </h3>
                <p className="text-xs text-[#756B6D] dark:text-[#A8989C] max-w-md mx-auto">
                  Générez automatiquement les jetons cryptographiques et étiquettes QR dédiés au nom de <strong>{order.customer}</strong>.
                </p>
              </div>
              <button
                onClick={handleGenerateNow}
                className="px-6 py-3 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#DFC68B]" />
                <span>Générer les QR Codes Maintenant</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Bottles List (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <span className="font-cinzel text-xs uppercase tracking-luxury text-[#541B28] font-bold block">
                  Flacons de la Commande ({certificates.length})
                </span>

                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {certificates.map((cert) => (
                    <div
                      key={cert.token}
                      onClick={() => handleSelectCert(cert)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                        selectedCert?.token === cert.token
                          ? "bg-white border-[#541B28] ring-2 ring-[#541B28]/25 shadow-md"
                          : "bg-white/80 border-[#541B28]/15 hover:border-[#541B28]/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {cert.qrDataUrl ? (
                          <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#541B28]/20 bg-[#FAF7F2] relative shrink-0">
                            <Image src={cert.qrDataUrl} alt="QR Code" fill className="object-contain" unoptimized />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-[#FAF7F2] flex items-center justify-center shrink-0">
                            <QrCode className="w-6 h-6 text-[#541B28]" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <span className="font-serif text-sm font-semibold text-[#23181A] block truncate">
                            {cert.productName}
                          </span>
                          <span className="text-[11px] text-[#541B28] font-bold block">
                            Format {cert.formatSize} &bull; Dédié à {cert.customerName}
                          </span>
                          <span className="font-mono text-[10px] text-[#756B6D] block truncate">
                            N° {cert.serialNumber}
                          </span>

                          {cert.videoUrl ? (
                            <span className="inline-flex items-center gap-1 text-[9px] text-[#434B36] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-1">
                              <Film className="w-2.5 h-2.5" />
                              Vidéo attachée
                            </span>
                          ) : (
                            <span className="inline-block text-[9px] text-[#756B6D] mt-1">
                              Aucune vidéo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Active Certificate Management & Video Upload (7 cols) */}
              {selectedCert && (
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#541B28]/15 shadow-sm space-y-6">
                  {/* Flacon Header */}
                  <div className="flex items-start justify-between pb-4 border-b border-[#541B28]/10 gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#541B28] font-bold block">
                        Flacon Sélectionné
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#23181A]">
                        {selectedCert.productName} ({selectedCert.formatSize})
                      </h3>
                      <p className="text-xs text-[#756B6D]">
                        Dédié à <strong>{selectedCert.customerName}</strong> &bull; N° Série : {selectedCert.serialNumber}
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handlePrintLabel(selectedCert)}
                        className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#541B28] text-[#541B28] hover:text-white transition-colors border border-[#541B28]/20"
                        title="Imprimer l'étiquette flacon"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/p/${selectedCert.token}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] transition-colors"
                        title="Ouvrir le certificat client"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* QR Preview Card */}
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#541B28]/15 flex items-center gap-4">
                    {selectedCert.qrDataUrl && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#541B28]/25 bg-white relative shrink-0 shadow-xs">
                        <Image src={selectedCert.qrDataUrl} alt="QR Code" fill className="object-contain" unoptimized />
                      </div>
                    )}
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-[#23181A] block">Lien du Certificat Scanné :</span>
                      <span className="font-mono text-[10px] text-[#541B28] font-bold break-all block">
                        /p/{selectedCert.token}
                      </span>
                      <span className="text-[10px] text-[#756B6D] block">
                        Ce QR code s&apos;imprime sur le flacon. Le client y accède instantanément avec son smartphone.
                      </span>
                    </div>
                  </div>

                  {/* VIDEO ATTACHMENT SECTION */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Film className="w-4 h-4 text-[#541B28]" />
                        <h4 className="font-serif text-base font-semibold text-[#23181A]">
                          Vidéo de Mise en Flacon / Dédicace Artisanale
                        </h4>
                      </div>
                      {selectedCert.videoUrl && (
                        <button
                          onClick={handleRemoveVideo}
                          className="text-[10px] text-rose-700 hover:underline flex items-center gap-1 font-bold"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Supprimer la vidéo</span>
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-[#756B6D]">
                      Uploadez une vidéo artisanale (mise en bouteille, scellement à la cire, message pour le client). Elle apparaîtra directement lorsque le client scannera son flacon !
                    </p>

                    {/* Mode selector */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setVideoInputType("url")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          videoInputType === "url"
                            ? "bg-[#541B28] text-white"
                            : "bg-[#FAF7F2] text-[#756B6D] border border-[#541B28]/15"
                        }`}
                      >
                        Lien Vidéo (URL / YouTube)
                      </button>
                      <button
                        type="button"
                        onClick={() => setVideoInputType("file")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          videoInputType === "file"
                            ? "bg-[#541B28] text-white"
                            : "bg-[#FAF7F2] text-[#756B6D] border border-[#541B28]/15"
                        }`}
                      >
                        Uploader un fichier (MP4 / MOV)
                      </button>
                    </div>

                    {/* Input based on type */}
                    {videoInputType === "url" ? (
                      <div>
                        <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                          URL Directe de la Vidéo
                        </label>
                        <input
                          type="text"
                          placeholder="https://.../video.mp4 ou lien YouTube"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl px-4 py-2.5 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                          Fichier Vidéo (Max 25 Mo)
                        </label>
                        <input
                          ref={videoFileRef}
                          type="file"
                          accept="video/*"
                          onChange={handleVideoFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => videoFileRef.current?.click()}
                          className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-[#541B28]/30 hover:border-[#541B28] bg-[#FAF7F2] text-[#541B28] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
                        >
                          <Upload className="w-4 h-4 text-[#C7A66A]" />
                          <span>{isVideoUploading ? "Chargement de la vidéo..." : "Choisir une vidéo (MP4, MOV, WEBM)"}</span>
                        </button>
                      </div>
                    )}

                    {/* Video notes / artisan dedication */}
                    <div>
                      <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                        Dédicace ou Note de l&apos;Artisan Parfumeur
                      </label>
                      <textarea
                        rows={2}
                        placeholder={`Ex: Flacon N° ${selectedCert.serialNumber} mis en flacon et scellé à la main avec soin pour ${order.customer}.`}
                        value={videoNotes}
                        onChange={(e) => setVideoNotes(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl p-3 text-xs text-[#23181A] focus:outline-none focus:border-[#541B28]"
                      />
                    </div>

                    {/* Video Preview if exists */}
                    {(previewVideoUrl || videoUrl) && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase text-[#756B6D] font-bold block">Aperçu Vidéo :</span>
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-black max-w-sm border border-[#541B28]/20">
                          {(previewVideoUrl || videoUrl).includes("youtube.com") || (previewVideoUrl || videoUrl).includes("youtu.be") ? (
                            <iframe src={(previewVideoUrl || videoUrl).replace("watch?v=", "embed/")} className="w-full h-full" allowFullScreen />
                          ) : (
                            <video src={previewVideoUrl || videoUrl} controls className="w-full h-full object-cover" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Save Video Action */}
                    <div className="pt-2 flex items-center justify-between">
                      {saveSuccess && (
                        <span className="text-xs text-[#434B36] font-bold flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600" />
                          Vidéo enregistrée pour ce flacon !
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={handleSaveVideoForCert}
                        className="ml-auto px-6 py-2.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-[#DFC68B]" />
                        <span>Enregistrer la Vidéo pour ce Flacon</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
