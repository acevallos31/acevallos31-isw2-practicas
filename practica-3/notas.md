S Responsabilidad única

Aplique responsabilidad unica separando las tareas que hacia la clase Pedido.
Antes la misma clase validaba stock, calculaba el total, guardaba, imprimia y enviaba mensajes.
Ahora cada tarea esta separada en una clase con una funcion especifica.
Esto hace que el codigo sea mas facil de entender y tambien de modificar.
Se aplica el principio 2: Una funcion, una responsabilidad.

D Inversion de dependencias

Aplique inversion de dependencias en el guardado del pedido y en el envío de WhatsApp.
El repositorio y el notificador ahora se pasan a Pedido como dependencias.
asi el Pedido no depende directamente de una implementacion especifica.
Si despues le cambiamos la base de datos o la forma de enviar mensajes, se puede hacer mas facil.
Se aplico el principio 9: Diseña para el cambio.