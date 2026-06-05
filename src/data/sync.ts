/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Bidirectional local storage and central server sync helpers
if (typeof window !== "undefined") {
  const originalSetItem = window.localStorage.setItem;
  window.localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, [key, value]);
    
    const syncKeys = [
      "users", "companies", "jobs", "applications",
      "cci_users", "cci_companies", "cci_jobs", "cci_applications", "cci_saved_jobs",
      "cci_sys_settings", "cci_audit_logs", "cci_faqs", "cci_blogs", "cci_current_user",
      "cci_cms_hero_title", "cci_cms_hero_subtext"
    ];
    if (syncKeys.includes(key)) {
      try {
        const parsed = JSON.parse(value);
        fetch(`/api/store/${encodeURIComponent(key)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: parsed })
        }).catch((err) => console.warn("[CCI Sync] Background push failed", err));
      } catch (_) {
        fetch(`/api/store/${encodeURIComponent(key)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value })
        }).catch((err) => console.warn("[CCI Sync] Background push failed", err));
      }
    }
  };
}

export async function syncFromServer(key: string, defaultValue: any): Promise<any> {
  try {
    const res = await fetch(`/api/store/${encodeURIComponent(key)}`);
    const data = await res.json();
    if (data.status === "success" && data.value !== null) {
      localStorage.setItem(key, JSON.stringify(data.value));
      return data.value;
    }
  } catch (err) {
    console.warn(`[CCI Sync] Pull failed for key "${key}", fallback to localStorage:`, err);
  }
  
  const localRaw = localStorage.getItem(key);
  if (localRaw) {
    try {
      const parsed = JSON.parse(localRaw);
      // Since server has no value, push this local value up to seed the server database
      await syncToServer(key, parsed);
      return parsed;
    } catch (_) {}
  }
  
  // Seed server with default
  await syncToServer(key, defaultValue);
  return defaultValue;
}

export async function syncToServer(key: string, value: any): Promise<void> {
  localStorage.setItem(key, JSON.stringify(value));
  try {
    await fetch(`/api/store/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ value })
    });
  } catch (err) {
    console.warn(`[CCI Sync] Push failed for key "${key}":`, err);
  }
}

// Bulk sync helper
export async function syncAllEntities(onUpdated: (key: string, val: any) => void): Promise<void> {
  const syncKeys = [
    { key: "users", def: [] },
    { key: "companies", def: [] },
    { key: "jobs", def: [] },
    { key: "applications", def: [] },
    { key: "cci_users", def: [] },
    { key: "cci_companies", def: [] },
    { key: "cci_jobs", def: [] },
    { key: "cci_applications", def: [] },
    { key: "cci_saved_jobs", def: [] },
    { key: "cci_sys_settings", def: {} },
    { key: "cci_audit_logs", def: [] },
    { key: "cci_faqs", def: [] },
    { key: "cci_blogs", def: [] }
  ];

  for (const item of syncKeys) {
    const freshVal = await syncFromServer(item.key, item.def);
    onUpdated(item.key, freshVal);
  }
}
