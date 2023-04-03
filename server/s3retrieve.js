


const streamToString = (stream) => new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
  
  const readFile = async (bucket, key) => {
    const params = {
      Bucket: bucket,
      Key: key,
    };
  
    const command = new GetObjectCommand(params);
    const response = await client.send(command);
  
    const { Body } = response; 
  
    return streamToString(Body);
  };