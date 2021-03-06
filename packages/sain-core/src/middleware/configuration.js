export function configuration(app, configuration) {
  const config = configuration,
    { portletInstance, system } = config,
    portletconfigs = {},
    systemconfigs = {};

  if (portletInstance && portletInstance.fields)
    for (const key in portletInstance.fields) portletconfigs[key] = portletInstance.fields[key].default.toString();
  if (system && system.fields)
    for (const key in system.fields) systemconfigs[key] = system.fields[key].default.toString();

  return {
    system: { ...systemconfigs, ...app.configuration.system },
    portletInstance: {
      ...portletconfigs,
      ...app.configuration.portletInstance,
    },
  };
}
