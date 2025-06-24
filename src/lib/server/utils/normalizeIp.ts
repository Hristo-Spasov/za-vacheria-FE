const normalizeIp = (ip: string): string => {
  if (ip.startsWith("::ffff:")) {
    return ip.substring(7);
  }
  // handle multiple IPs in x-forwarded-for
  if (ip.includes(",")) {
    return ip.split(",")[0].trim();
  }
  return ip;
};

export default normalizeIp;
