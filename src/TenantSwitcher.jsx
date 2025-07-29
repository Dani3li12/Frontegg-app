import React, { useEffect, useState } from "react";
import { useAuth, useAuthActions, useTenantsActions } from "@frontegg/react";

const TenantSwitcher = () => {
  const { user } = useAuth();
  const { setActiveTenant } = useAuthActions();
  const { loadTenants } = useTenantsActions();

  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true);
      try {
        const response = await loadTenants();
        setTenants(response?.tenants || []);
      } catch (err) {
        console.error("Failed to load tenants", err);
      }
      setLoading(false);
    };

    fetchTenants();
  }, [loadTenants]);

  const handleChange = (e) => {
    const selectedTenantId = e.target.value;
    setActiveTenant(selectedTenantId);
  };

  //   if (loading || tenants.length <= 1) return null;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="tenant-select" style={{ marginRight: "8px" }}>
        Switch Tenant:
      </label>
      <select id="tenant-select" value={user?.tenantId} onChange={handleChange}>
        {tenants.map((tenant) => (
          <option key={tenant.tenantId} value={tenant.tenantId}>
            {tenant.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TenantSwitcher;
