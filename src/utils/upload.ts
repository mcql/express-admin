import { Express } from 'express'
import path from 'path'

const uploadApi = (app: Express) => {
  app.post('/api/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }
    const sampleFile: any = req.files.file
    const nowData = new Date().getTime()
    const uploadPath: any = path.join(
      __dirname,
      `../../public/upload/${nowData}-${sampleFile.name}`
    )
    sampleFile.mv(uploadPath, function (err: any) {
      if (err) return res.status(500).send(err)
      res.json({
        code: 0,
        payload: [
          {
            url: `http://localhost:3334/upload/${nowData}-${sampleFile.name}`
          }
        ],
        msg: '上传成功'
      })
    })
  })
}

export default uploadApi
