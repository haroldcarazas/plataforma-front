import axiosAPI from "./axiosApi"

export const fetchCursosByUsuarioId = async (usuarioId) => {
    const res = await axiosAPI.get(`http://localhost:3000/api/cursos/usuario/${usuarioId}`)
    return res.data
}

export const fetchById = async (cursoId) => {
    const res = await axiosAPI.get(`http://localhost:3000/api/cursos/${cursoId}`)
    return res.data
}