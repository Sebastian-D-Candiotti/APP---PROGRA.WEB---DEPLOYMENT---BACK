import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import repository from '../repositories/usuario.js'

const generarToken = (id, rol) => {
    return jwt.sign({id,rol},
    'zMxNgV1cjUcjKnSCOZykseZaoYvUVPBtYqBOTZmJW2P',
    { expiresIn: '7d'}
    )
}

const registrar = async ({ nombre, correo, password, dni, img,estado,fechaRegistro,rol}) => {

    try {

        if (!nombre|| !correo|| !password || !dni || !img || !estado || !fechaRegistro ||!rol) {
            return {
                success: false,
                message: 'Proporcione los campos requeridos. '
            }
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const nuevoUsuario = {
            nombre,
            correo,
            password: hashedPassword,
            dni,
            img,
            estado,
            fecharegistro: fechaRegistro,
            rol,
            createdAt: new Date(),
            updateAt: new Date()
        }
    
        const usuarioCreado = await repository.create(nuevoUsuario);
    
        const token = generarToken(usuarioCreado.id,usuarioCreado.rol);
    
        return {
            success: true,
            message: "Usuario registrado exitosamente",
            token,
            usuario: usuarioCreado
        };

    } catch (error) {
        console.error('Error al registrar usuario', error);
        return null;
    }
};

const login = async ({usuario: correo, password}) => {
    
    // Mueve logs y la lógica dentro del try/catch
    try {
        if (!correo || !password) { /* ... */ }

        const usr = await repository.findByEmail(correo);

        if (!usr) {
            return {
                success: false,
                message: "Correo o contraseña incorrectos."
            }
        }

        console.log("DEBUG SERVICE - USR: ", {
            id: usr ? usr.id : 'NULO',
            rol: usr ? usr.rol : 'NULO',
            password_exists: !!usr.password
        });
        
        if (!usr.password || usr.password.length < 5) { /* ... */ }
        
        const isPasswordValid = await bcrypt.compare(password, usr.password);
        console.log("Password Match:", isPasswordValid);

        if (!isPasswordValid) {
            return {
                success: false,
                message: "Correo o contraseña incorrectos."
            }
        }

        if (!usr.id || !usr.rol) {
            console.error("ERROR: ID o ROL del usuario son nulos. Falló la generación del token.");
            return { success: false, message: "Error interno en el usuario." };
        }
        
        const token = generarToken(usr.id, usr.rol);

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            usuario: usr
        };

    } catch (error) {
        console.error('ERROR CRÍTICO CAPTURADO EN LOGIN:', error);
        return { success: false, message: "Error interno del servidor." };
    }
};

const usuarioService = { registrar, login }

export default usuarioService;